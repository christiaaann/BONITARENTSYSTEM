import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  AlertTriangle, 
  Calendar, 
  Phone, 
  Clock, 
  ShieldAlert,
  Package,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ReturnsAndOverdue = () => {
  const [activeRentals, setActiveRentals] = useState([
    {
      id: 1,
      rental_code: 'BONITA-99M103',
      customer_name: 'Angel Locsin',
      customer_phone: '09191112223',
      items: [
        { 
          id: 'ITEM-101', 
          code: 'GOWN-005', 
          name: 'Modern Filipiniana', 
          color: 'Cream', 
          size: 'Size S', 
          security_deposit: 500.00 
        },
        { 
          id: 'ITEM-102', 
          code: 'SHOES-001', 
          name: 'High Heels', 
          color: 'Nude', 
          size: 'Size 38', 
          security_deposit: 0.00 
        }
      ],
      start_date: '2026-08-15',
      end_date: '2026-08-18',
      days_overdue: 5,
      total_price: 2500.00,
      reservation_fee: 1250.00,
      remaining_balance: 1250.00,
      status: 'overdue'
    },
    {
      id: 2,
      rental_code: 'BONITA-44K9L2',
      customer_name: 'Juan Dela Cruz',
      customer_phone: '09189876543',
      items: [
        { 
          id: 'ITEM-103', 
          code: 'SUIT-002', 
          name: 'Black Tuxedo Suit', 
          color: 'Black', 
          size: 'Size L', 
          security_deposit: 1000.00 
        }
      ],
      start_date: '2026-08-22',
      end_date: '2026-08-25',
      days_overdue: 0,
      total_price: 2200.00,
      reservation_fee: 1100.00,
      remaining_balance: 1100.00,
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [tabFilter, setTabFilter] = useState('all');
  const [selectedRental, setSelectedRental] = useState(null);

  // Return Processing Form States
  const [latePenalty, setLatePenalty] = useState(0);
  const [damageFee, setDamageFee] = useState(0);
  const [refundMethod, setRefundMethod] = useState('Cash');
  const [accountNumber, setAccountNumber] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [notes, setNotes] = useState('');

  const DAILY_PENALTY_RATE = 100;

  // Open Process Modal
  const handleOpenReturnModal = (rental) => {
    setSelectedRental(rental);
    const computedLate = rental.days_overdue > 0 ? rental.days_overdue * DAILY_PENALTY_RATE : 0;
    
    setLatePenalty(computedLate);
    setDamageFee(0);
    setRefundMethod('Cash');
    setAccountNumber(rental.customer_phone || '');
    setReferenceNo('');
    setNotes('');
  };

  // Computations
  const securityDeposit = selectedRental 
    ? selectedRental.items.reduce((sum, item) => sum + (Number(item.security_deposit) || 0), 0)
    : 0;

  const totalDeductions = Number(latePenalty) + Number(damageFee);
  const isDepositPresent = securityDeposit > 0;
  
  // Computed values for Overdue/Forfeiture logic
  const netRefund = isDepositPresent ? Math.max(0, securityDeposit - totalDeductions) : 0;
  const balanceToCollect = !isDepositPresent 
    ? totalDeductions 
    : (totalDeductions > securityDeposit ? totalDeductions - securityDeposit : 0);

  // Submit Final Return
  const handleProcessReturn = (e) => {
    e.preventDefault();

    let summaryMessage = '';
    if (isDepositPresent) {
      if (netRefund > 0) {
        summaryMessage = `Mag-i-issue ng ₱${netRefund.toFixed(2)} refund via ${refundMethod}.`;
      } else if (balanceToCollect > 0) {
        summaryMessage = `Na-forfeit ang buong ₱${securityDeposit.toFixed(2)} deposit. Kailangan pang maningil ng ₱${balanceToCollect.toFixed(2)} na kulang sa penalty/damage fee.`;
      } else {
        summaryMessage = `Na-forfeit ang buong ₱${securityDeposit.toFixed(2)} deposit pambayad sa penalty. Walang ibabalik at wala nang karagdagang sisingilin.`;
      }
    } else {
      summaryMessage = balanceToCollect > 0 
        ? `Maniningil ng ₱${balanceToCollect.toFixed(2)} para sa late penalty/damage fee.` 
        : `Walang kailangang bayaran o i-refund.`;
    }

    if (window.confirm(`Isoli ang lahat ng items sa ${selectedRental.rental_code}?\n\n${summaryMessage}`)) {
      setActiveRentals(activeRentals.filter(item => item.id !== selectedRental.id));
      setSelectedRental(null);
      alert(`Return processed successfully! Status updated and inventory restocked.`);
    }
  };

  const filteredRentals = activeRentals.filter(item => {
    const matchesSearch = 
      item.rental_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.items.some(i => 
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        i.code.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (tabFilter === 'all') return matchesSearch;
    return matchesSearch && item.status === tabFilter;
  });

  return (
    <div className="min-h-screen p-6 font-sans">
      <div className="space-y-4">

        {/* Minimalist Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Returns & Overdue</h1>
            <p className="text-xs text-slate-500 mt-0.5">Manage apparel returns, deposit refunds, and late penalties</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-medium text-slate-600">On Schedule:</span>
              <span className="text-xs font-bold text-slate-900">
                {activeRentals.filter(r => r.status === 'active').length}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span className="text-xs font-medium text-slate-600">Overdue:</span>
              <span className="text-xs font-bold text-slate-900">
                {activeRentals.filter(r => r.status === 'overdue').length}
              </span>
            </div>
          </div>
        </div>

        {/* Search and Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search order, customer, item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs transition"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/60 w-full sm:w-auto">
            <button
              onClick={() => setTabFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                tabFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Out-for-Rent
            </button>
            <button
              onClick={() => setTabFilter('overdue')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition flex items-center gap-1.5 ${
                tabFilter === 'overdue' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overdue
              {activeRentals.filter(r => r.status === 'overdue').length > 0 && (
                <span className="bg-rose-100 text-rose-700 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                  {activeRentals.filter(r => r.status === 'overdue').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setTabFilter('active')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                tabFilter === 'active' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Rental Code</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Item(s) Rented</th>
                  <th className="py-3 px-4">Expected Return</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredRentals.length > 0 ? (
                  filteredRentals.map((rental) => {
                    const totalBundleDeposit = rental.items.reduce((acc, i) => acc + i.security_deposit, 0);

                    return (
                      <tr key={rental.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-mono font-semibold text-slate-900">{rental.rental_code}</div>
                          <span className="text-[11px] text-slate-400 block">
                            Security Deposit: {totalBundleDeposit > 0 ? `₱${totalBundleDeposit.toFixed(2)}` : '₱0.00'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-slate-800 block">{rental.customer_name}</span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" /> {rental.customer_phone}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-[11px] text-slate-400 font-medium mb-1">
                            {rental.items.length} item(s)
                          </div>
                          <div className="space-y-1">
                            {rental.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-1.5">
                                <Package className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <div>
                                  <span className="font-medium text-slate-800">{item.name}</span>
                                  <span className="text-[11px] text-slate-400 ml-1">
                                    ({item.size} / {item.color})
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{rental.end_date}</span>
                          </div>
                          {rental.days_overdue > 0 && (
                            <span className="text-[10px] text-rose-600 font-medium block mt-0.5">{rental.days_overdue} days late</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {rental.status === 'overdue' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200/60">
                              <AlertTriangle className="w-3 h-3" /> Overdue
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                              <Clock className="w-3 h-3" /> Active
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleOpenReturnModal(rental)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition shadow-2xs ${
                              rental.status === 'overdue'
                                ? 'bg-rose-600 hover:bg-rose-700'
                                : 'bg-slate-900 hover:bg-slate-800'
                            }`}
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Process Return
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                      No active or overdue items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Return & Settlement Modal */}
      {selectedRental && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-4 border border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-slate-800" />
                <h3 className="font-semibold text-slate-900 text-sm">
                  Process Return & Settlement
                </h3>
              </div>
              <button 
                onClick={() => setSelectedRental(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProcessReturn} className="space-y-4 text-xs">
              
              {/* Order Info */}
              <div className="p-3 bg-slate-50 rounded-lg space-y-2 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Rental Code:</span>
                  <span className="font-mono font-semibold text-slate-900">{selectedRental.rental_code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Customer:</span>
                  <span className="font-medium text-slate-800">{selectedRental.customer_name} ({selectedRental.customer_phone})</span>
                </div>
                
                <div className="border-t border-slate-200/60 pt-2 mt-2">
                  <span className="text-slate-600 font-medium block mb-1">Rented Items:</span>
                  <div className="space-y-1">
                    {selectedRental.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-slate-700">
                        <span>{item.name} ({item.size} / {item.color})</span>
                        <span className="font-mono text-slate-500 text-[10px]">{item.code}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Overdue Banner */}
              {selectedRental.days_overdue > 0 && (
                <div className="p-3 bg-rose-50 border border-rose-200/60 rounded-lg flex items-start gap-2.5 text-rose-800">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-xs">Overdue Notice</span>
                    <span className="text-[11px] text-rose-700">
                      Item is late by <strong>{selectedRental.days_overdue} days</strong>. Late fee rate: ₱{DAILY_PENALTY_RATE}/day.
                    </span>
                  </div>
                </div>
              )}

              {/* Fee Inputs */}
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="text-slate-600 font-medium">Security Deposit Held:</span>
                  <span className="font-bold text-slate-900">
                    {isDepositPresent ? `₱${securityDeposit.toFixed(2)}` : '₱0.00'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Late Penalty Charge (₱):</label>
                    <input
                      type="number"
                      min="0"
                      value={latePenalty === 0 ? '' : latePenalty}
                      onChange={(e) => setLatePenalty(e.target.value === '' ? '' : Number(e.target.value))}
                      onBlur={(e) => e.target.value === '' && setLatePenalty(0)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Damage / Stain Fee (₱):</label>
                    <input
                      type="number"
                      min="0"
                      value={damageFee === 0 ? '' : damageFee}
                      onChange={(e) => setDamageFee(e.target.value === '' ? '' : Number(e.target.value))}
                      onBlur={(e) => e.target.value === '' && setDamageFee(0)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-rose-600 font-semibold focus:outline-none focus:ring-1 focus:ring-rose-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Calculation Summary Box */}
                <div className="p-3 bg-slate-100 rounded-lg space-y-2 border border-slate-200/80 font-medium text-slate-700">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Total Penalty & Damage Deductions:</span>
                    <span className="text-rose-600 font-semibold">₱{totalDeductions.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    {isDepositPresent ? (
                      <>
                        <span className="font-semibold text-slate-800">Net Refund to Customer:</span>
                        <span className={`text-sm font-bold ${netRefund === 0 ? 'text-slate-500' : 'text-emerald-600'}`}>
                          ₱{netRefund.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-semibold text-slate-800">Balance to Collect:</span>
                        <span className={`text-sm font-bold ${balanceToCollect > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          ₱{balanceToCollect.toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Overdue Forfeiture Dynamic Alerts */}
                  {isDepositPresent && totalDeductions >= securityDeposit && (
                    <div className="mt-2 pt-2 border-t border-slate-200">
                      {balanceToCollect > 0 ? (
                        <div className="p-2 bg-rose-100/70 border border-rose-200 rounded-md text-[11px] text-rose-800 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                          <span>
                            <strong>Deposit Exceeded:</strong> Na-forfeit ang ₱{securityDeposit.toFixed(2)} deposit. Maniningil ng karagdagang <strong>₱{balanceToCollect.toFixed(2)}</strong> sa customer.
                          </span>
                        </div>
                      ) : (
                        <div className="p-2 bg-amber-100/70 border border-amber-200 rounded-md text-[11px] text-amber-800 flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                          <span>
                            <strong>Fully Forfeited:</strong> Kinain ng penalty ang buong ₱{securityDeposit.toFixed(2)} deposit. Walang refund na ibabalik kay customer.
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Conditional Refund Payment Details (Show ONLY if netRefund > 0) */}
                {isDepositPresent && netRefund > 0 && (
                  <>
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Refund Method:</label>
                      <select
                        value={refundMethod}
                        onChange={(e) => setRefundMethod(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
                      >
                        <option value="Cash">Cash</option>
                        <option value="GCash">GCash</option>
                        <option value="Maya">Maya</option>
                      </select>
                    </div>

                    {refundMethod !== 'Cash' && (
                      <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div>
                          <label className="block text-slate-700 font-medium mb-1">{refundMethod} Account No:</label>
                          <input
                            type="text"
                            required
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="09191112223"
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-medium mb-1">{refundMethod} Ref No:</label>
                          <input
                            type="text"
                            required
                            value={referenceNo}
                            onChange={(e) => setReferenceNo(e.target.value)}
                            placeholder="1002 938 10293"
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Remarks / Condition upon Return:</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="2"
                    placeholder="e.g. Good condition, penalty applied due to late return"
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedRental(null)}
                  className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`w-1/2 py-2 font-medium rounded-lg transition shadow-2xs text-white ${
                    totalDeductions > 0 && netRefund === 0
                      ? 'bg-rose-600 hover:bg-rose-700'
                      : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                >
                  {netRefund > 0 
                    ? 'Confirm & Issue Refund' 
                    : balanceToCollect > 0 
                    ? `Confirm & Collect ₱${balanceToCollect.toFixed(2)}` 
                    : 'Confirm Return & Forfeit Deposit'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReturnsAndOverdue;