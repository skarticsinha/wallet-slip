export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';
export type AccountType = 'bank' | 'card' | 'wallet' | 'cash' | 'crypto'; // Mapping your USER-DEFINED types

export interface Category {
  id: number;
  name: string;
  type: string;
  color?: string;
  icon?: string;
}

export interface Account {
  id: string;
  name: string;
  current_balance: number;
  type: AccountType; 
  // These props are for UI display, we can default them if not in DB yet
  color?: string; 
  icon?: any;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  description: string | null;
  transaction_date: string;
  category_id?: number;
  paid_from_account_id?: string;
  paid_to_account_id?: string;
  
  // Joins (Supabase will return these nested)
  categories?: Category; 
  
  // Helper props for UI mapping
  title?: string;
  categoryName?: string;
}

export interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  savings: number;
  savingsRate: string;
}