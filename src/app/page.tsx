'use client'; // This directive is necessary for using hooks like useState and useEffect

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient'; // Import our Supabase client

// Define types for our data to use with TypeScript
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  transaction_date: string;
}

interface BudgetSummary {
  total_spent: number;
  total_limit: number;
}

export default function Home() {
  // State variables to hold our data
  const [netWorth, setNetWorth] = useState<number | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This function will run when the component mounts
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // --- TODO: Call your Supabase functions ---
        // We will implement these calls together.
        // For now, we'll use placeholder data.

        // Example of calling a Supabase function (we will uncomment and fix this)
        // const { data: netWorthData, error: netWorthError } = await supabase.rpc('get_user_net_worth');
        // if (netWorthError) throw netWorthError;
        // setNetWorth(netWorthData);

        // Fetch recent transactions (a simple select query)
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('transactions')
          .select('id, description, amount, type, transaction_date')
          .order('transaction_date', { ascending: false })
          .limit(5);

        if (transactionsError) throw transactionsError;
        setRecentTransactions(transactionsData || []);

        // Placeholder data until we implement the function calls
        setNetWorth(54321.78);
        setBudgetSummary({ total_spent: 450.50, total_limit: 1500 });

      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading your financial dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-indigo-700 transition-colors">Add Expense</button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-green-700 transition-colors">Add Income</button>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Add Transfer</button>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
              <ul className="space-y-3">
                {recentTransactions.length > 0 ? recentTransactions.map(tx => (
                  <li key={tx.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{tx.description || 'Transaction'}</p>
                      <p className="text-sm text-gray-500">{new Date(tx.transaction_date).toLocaleDateString()}</p>
                    </div>
                    <p className={`font-bold ${tx.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'INCOME' ? '+' : '-'} ${tx.amount}
                    </p>
                  </li>
                )) : (
                  <p className="text-gray-500">No recent transactions found.</p>
                )}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Net Worth */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-600 mb-2">Net Worth</h2>
              <p className="text-4xl font-bold text-gray-900">
                ${netWorth?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Budget Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-600 mb-2">This Month's Budget</h2>
              {budgetSummary && (
                <div>
                  <div className="flex justify-between text-lg font-medium">
                    <span>${budgetSummary.total_spent.toFixed(2)}</span>
                    <span className="text-gray-500">${budgetSummary.total_limit.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${(budgetSummary.total_spent / budgetSummary.total_limit) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
