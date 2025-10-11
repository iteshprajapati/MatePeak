import { supabase } from "@/integrations/supabase/client";

export interface WalletData {
  id: string;
  mentor_id: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  booking_id?: string;
  type: 'credit' | 'debit' | 'commission';
  amount: number;
  description?: string;
  created_at: string;
}

/**
 * Get mentor's wallet
 */
export async function getMyWallet() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { success: false, error: 'Not authenticated', data: null };
  }
  
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('mentor_id', user.id)
    .single();
  
  if (error) {
    console.error('Error fetching wallet:', error);
    return { success: false, error: error.message, data: null };
  }
  
  return { success: true, data };
}

/**
 * Get wallet transactions
 */
export async function getWalletTransactions(limit = 50) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { success: false, error: 'Not authenticated', data: [] };
  }
  
  // First get the wallet
  const { data: wallet } = await supabase
    .from('wallets')
    .select('id')
    .eq('mentor_id', user.id)
    .single();
  
  if (!wallet) {
    return { success: false, error: 'Wallet not found', data: [] };
  }
  
  const { data, error } = await supabase
    .from('wallet_transactions')
    .select('*')
    .eq('wallet_id', wallet.id)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching transactions:', error);
    return { success: false, error: error.message, data: [] };
  }
  
  return { success: true, data };
}

/**
 * Request withdrawal
 */
export async function requestWithdrawal(amount: number, accountDetails: any) {
  const { data, error } = await supabase.functions.invoke('wallet-withdraw', {
    body: { amount, account_details: accountDetails }
  });
  
  if (error) {
    console.error('Withdrawal error:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to process withdrawal',
      data: null 
    };
  }
  
  return data;
}
