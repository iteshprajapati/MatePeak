
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const openAiKey = Deno.env.get('OPENAI_API_KEY')
const supabaseUrl = 'https://xpusdfxewlhzjefloibl.supabase.co'
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { query } = await req.json()
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Get all mentors from the database
    const { data: mentors } = await supabase
      .from('expert_profiles')
      .select('*')
    
    // Use OpenAI to analyze the query and find relevant mentors
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a search assistant helping to match mentors with user queries. Analyze the mentors data and the user query to find the most relevant matches.'
          },
          {
            role: 'user',
            content: `User Query: "${query}"\n\nMentors Data: ${JSON.stringify(mentors)}\n\nReturn only the IDs of the most relevant mentors as a JSON array.`
          }
        ],
        temperature: 0.5,
      }),
    })

    const aiResult = await openAIResponse.json()
    const relevantMentorIds = JSON.parse(aiResult.choices[0].message.content)

    // Get the filtered mentors
    const { data: filteredMentors, error } = await supabase
      .from('expert_profiles')
      .select('*')
      .in('id', relevantMentorIds)

    if (error) throw error

    return new Response(
      JSON.stringify({ mentors: filteredMentors }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
