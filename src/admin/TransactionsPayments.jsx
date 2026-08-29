import React, { useState } from 'react';
import { 
  Search, 
  Receipt, 
  Eye, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownLeft,
  X,
  Printer,
  Sparkles,
  Send
} from 'lucide-react';

const TransactionsPayments = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      txn_id: 'TXN-90812',
      date: '2026-08-20 10:30 AM',
      customer_name: 'Angel Locsin',
      customer_phone: '09191112223',
      rental_code: 'BONITA-99M103',
      items_summary: 'Modern Filipiniana (Cream, Size S)',
      payment_method: 'GCASH',
      ref_no: 'GCASH-REF-77120012',
      rental_price: 2000.00,
      reservation_fee: 1000.00,
      remaining_balance: 1000.00,
      security_deposit: 500.00,
      late_penalty: 500.00,
      damage_fee: 0.00,
      refund_amount: 0.00,
      net_collection: 2500.00,
      status: 'DEPOSIT_FORFEITED',
      breakdown: [
        { label: '50% Reservation Fee Paid', type: 'inflow' },
        { label: 'Remaining Balance Paid', type: 'inflow' },
        { label: 'Security Deposit', type: 'deposit' },
        { label: '(Late Penalty)', type: 'forfeited' }
      ]
    },
    {
      id: 2,
      txn_id: 'TXN-90814-RES',
      date: '2026-08-22 02:15 PM',
      customer_name: 'Juan Dela Cruz',
      customer_phone: '09189876543',
      rental_code: 'BONITA-44K9L2',
      items_summary: 'Black Tuxedo Suit (Size L)',
      payment_method: 'MAYA',
      ref_no: 'MAYA-REF-30192843',
      rental_price: 2200.00,
      reservation_fee: 1100.00,
      remaining_balance: 1100.00,
      security_deposit: 1000.00,
      late_penalty: 0.00,
      damage_fee: 0.00,
      refund_amount: 0.00,
      net_collection: 3200.00,
      status: 'ACTIVE_SETTLED',
      breakdown: [
        { label: '50% Reservation Fee', type: 'inflow' },
        { label: 'Pick-up Remaining Balance', type: 'inflow' },
        { label: 'Security Deposit', type: 'deposit' }
      ]
    },
    {
      id: 3,
      txn_id: 'TXN-90810-RES',
      date: '2026-08-18 09:00 AM',
      customer_name: 'Maria Santos',
      customer_phone: '09171234567',
      rental_code: 'BONITA-88X2A1',
      items_summary: 'Evening Gown (Red, Size M)',
      payment_method: 'GCASH',
      ref_no: 'GCASH-REF-55112233',
      rental_price: 2000.00,
      reservation_fee: 1000.00,
      remaining_balance: 1000.00,
      security_deposit: 500.00,
      late_penalty: 0.00,
      damage_fee: 0.00,
      refund_amount: 500.00,
      net_collection: 2000.00,
      status: 'DEPOSIT_REFUNDED',
      breakdown: [
        { label: '50% Reservation Fee', type: 'inflow' },
        { label: 'Pick-up Remaining Balance', type: 'inflow' },
        { label: 'Security Deposit', type: 'deposit' },
        { label: 'Deposit Refund', type: 'refund' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [selectedTxn, setSelectedTxn] = useState(false);

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = 
      txn.txn_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.rental_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.ref_no.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'ALL') return matchesSearch;
    if (filterType === 'FORFEITED') return matchesSearch && txn.status === 'DEPOSIT_FORFEITED';
    if (filterType === 'REFUNDS') return matchesSearch && txn.status === 'DEPOSIT_REFUNDED';
    return matchesSearch;
  });

  return (
    <div className=" flex p-6 font-sans">
      <div className="space-y-4 w-full">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
          <div>
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-indigo-600" />
              <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Transactions & Payment</h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Audit logs for reservation fees, collections, security deposits, and penalties.</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Txn ID, rental code, ref no, customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-600 shadow-2xs transition"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/60 w-full sm:w-auto">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                filterType === 'ALL' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Records
            </button>
            <button
              onClick={() => setFilterType('FORFEITED')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                filterType === 'FORFEITED' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Forfeited Deposits
            </button>
            <button
              onClick={() => setFilterType('REFUNDS')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                filterType === 'REFUNDS' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Refunds
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">TXN ID & DATE</th>
                  <th className="py-3 px-4">CUSTOMER & RENTAL CODE</th>
                  <th className="py-3 px-4">LEDGER BREAKDOWN</th>
                  <th className="py-3 px-4">PAYMENT REF</th>
                  <th className="py-3 px-4 text-center">STATUS</th>
                  <th className="py-3 px-4 text-right">NET COLLECTION</th>
                  <th className="py-3 px-4 text-center">RECEIPT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-slate-900">{txn.txn_id}</div>
                      <span className="text-[11px] text-slate-400 block">{txn.date}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block">{txn.customer_name}</span>
                      <span className="font-mono text-indigo-600 text-[11px] font-semibold">{txn.rental_code}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {txn.breakdown.map((item, idx) => {
                          let badgeStyle = "bg-slate-100 text-slate-600";
                          if (item.type === 'inflow') badgeStyle = "bg-purple-50 text-purple-700 border border-purple-200/60";
                          if (item.type === 'deposit') badgeStyle = "bg-emerald-50 text-emerald-700 border border-emerald-200/60";
                          if (item.type === 'refund') badgeStyle = "bg-amber-50 text-amber-700 border border-amber-200/60";
                          if (item.type === 'forfeited') badgeStyle = "bg-amber-100 text-amber-800 border border-amber-300 font-semibold";

                          return (
                            <span key={idx} className={`px-2 py-0.5 rounded text-[10px] ${badgeStyle}`}>
                              {item.label}
                            </span>
                          );
                        })}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block text-[11px]">{txn.payment_method}</span>
                      <span className="font-mono text-[10px] text-slate-400">{txn.ref_no}</span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {txn.status === 'DEPOSIT_FORFEITED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                          <ShieldAlert className="w-3 h-3 text-amber-600" /> FORFEITED
                        </span>
                      )}

                      {txn.status === 'ACTIVE_SETTLED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> ACTIVE
                        </span>
                      )}

                      {txn.status === 'DEPOSIT_REFUNDED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <ArrowDownLeft className="w-3 h-3 text-amber-600" /> REFUNDED
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      +₱{txn.net_collection.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedTxn(txn)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-medium transition"
                      >
                        <Eye className="w-3 h-3" /> View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Real Receipt Modal Design */}
      {selectedTxn && (
        <div className=" flex items-center w-120  justify-center p-2 z-50 overflow-y-auto">
          
          <div className="relative my-8">
            
            {/* Close Button Top Right Floating */}
            <button 
              onClick={() => setSelectedTxn(null)}
              className="absolute -top-3 -right-3 bg-white text-slate-700 rounded-full p-1.5  z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Thermal Receipt Body */}
            <div className="bg-white border border-stone-200 text-stone-800 rounded-lg p-6 font-mono text-xs relative overflow-hidden">
              
              {/* Jagged / Sawtooth Top Pattern Simulation */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-repeat-x bg-[radial-gradient(circle_at_bottom,transparent_4px,#f5f5f4_4px)]" />

              {/* Header Logo & Store Info */}
              <div className="text-center pb-4 border-b border-dashed border-stone-300">
                <div className="flex items-center justify-center gap-1.5 font-bold text-stone-900 text-base tracking-widest uppercase">
                  <span>BONITA</span>
                </div>
                <p className="text-[10px] text-stone-500 font-sans mt-0.5">Official Rental Receipt & Statement</p>
                <p className="text-[9px] text-stone-400 font-sans">Irosin, Sorsogon • 0919-123-4567</p>
              </div>

              {/* Receipt Metadata */}
              <div className="py-3 border-b border-dashed border-stone-300 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-stone-500">TXN ID:</span>
                  <span className="font-bold">{selectedTxn.txn_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">DATE/TIME:</span>
                  <span>{selectedTxn.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">RENTAL CODE:</span>
                  <span className="font-bold text-indigo-700">{selectedTxn.rental_code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">CUSTOMER:</span>
                  <span className="truncate max-w-37.5 font-medium">{selectedTxn.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">PAYMENT VIA:</span>
                  <span>{selectedTxn.payment_method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">REF NO:</span>
                  <span className="text-[10px]">{selectedTxn.ref_no}</span>
                </div>
              </div>

              {/* Rented Items Summary */}
              <div className="py-3 border-b border-dashed border-stone-300">
                <div className="text-[10px] text-stone-400 font-sans uppercase mb-1">Item Details</div>
                <div className="flex justify-between font-semibold text-[11px]">
                  <span>{selectedTxn.items_summary}</span>
                  <span>₱{selectedTxn.rental_price.toFixed(2)}</span>
                </div>
              </div>

              {/* Charges Breakdown */}
              <div className="py-3 border-b border-dashed border-stone-300 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span>Rental Price:</span>
                  <span>₱{selectedTxn.rental_price.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-stone-600">
                  <span>- 50% Online Reservation:</span>
                  <span>₱{selectedTxn.reservation_fee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>- Pick-up Balance Paid:</span>
                  <span>₱{selectedTxn.remaining_balance.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-1 border-t border-stone-200">
                  <span>Security Deposit Held:</span>
                  <span>₱{selectedTxn.security_deposit.toFixed(2)}</span>
                </div>

                {/* Overdue Penalty Row */}
                {selectedTxn.late_penalty > 0 && (
                  <div className="flex justify-between ">
                    <span>Overdue Penalty Fee:</span>
                    <span>-₱{selectedTxn.late_penalty.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Final Refund & Net Paid */}
              <div className="py-3 space-y-1.5">
                <div className="flex justify-between text-stone-600 font-sans text-[11px]">
                  <span>Deposit Refund Issued:</span>
                  <span className={`font-bold font-mono ${selectedTxn.refund_amount > 0 ? "text-amber-600" : "text-stone-400"}`}>
                    ₱{selectedTxn.refund_amount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-stone-800 text-stone-900 font-bold text-sm">
                  <span>TOTAL SHOP REVENUE:</span>
                  <span>₱{selectedTxn.net_collection.toFixed(2)}</span>
                </div>
              </div>

              {/* Status Stamp Box */}
              {selectedTxn.status === 'DEPOSIT_FORFEITED' && (
                <div className="my-2 p-2 border-2 border-dashed border-gray-300 rounded text-center">
                  <div className="text-black font-bold text-[11px] tracking-wider uppercase">
                    *** DEPOSIT FORFEITED ***
                  </div>
                  <p className="text-[9px] text-black font-sans mt-0.5">
                    Security deposit fully applied to overdue late penalty. No cash refund returned.
                  </p>
                </div>
              )}

              {selectedTxn.status === 'DEPOSIT_REFUNDED' && (
                <div className="my-2 p-2 border-2 border-dashed border-emerald-600 rounded text-center bg-emerald-50/50">
                  <div className="text-emerald-800 font-bold text-[11px] tracking-wider uppercase">
                    *** DEPOSIT REFUNDED ***
                  </div>
                  <p className="text-[9px] text-emerald-700 font-sans mt-0.5">
                    Security deposit of ₱{selectedTxn.security_deposit.toFixed(2)} has been fully returned to customer.
                  </p>
                </div>
              )}

              {/* Thermal Barcode Footer */}
              <div className="pt-3 text-center space-y-2 border-t border-dashed border-stone-300">
                <div className="font-mono text-[9px] tracking-[0.2em] text-stone-400 select-none">
                  ||| | ||||| || |||||| |||| | ||| ||||
                </div>
                <p className="text-[9px] text-stone-400 font-sans">
                  Thank you for renting with BONITA! <br /> Keep this receipt for reference.
                </p>
              </div>

              {/* Print Action Bar Inside Modal */}
              <div className="mt-4 pt-3 border-t border-stone-200 flex gap-2 font-sans">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-1.5 bg-stone-200 hover:bg-stone-300 text-black rounded text-xs font-medium flex items-center justify-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Receipt
                </button>
                <button
                  onClick={() => setSelectedTxn(null)}
                  className="px-3 flex items-center gap-2  py-1.5 bg-stone-900 hover:bg-stone-900 text-white rounded text-xs font-medium transition"
                >
                  <Send className='w-3 h-3.5' />  
                  Send Receipt
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TransactionsPayments;