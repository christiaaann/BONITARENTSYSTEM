import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Phone, 
  Eye, 
  XCircle,
  Check,
  CreditCard,
  Package,
  Tag,
  ShieldCheck,
  ShieldOff,
  Wallet,
  CalendarCheck,
  Receipt
} from 'lucide-react';

const ActiveRentals = () => {
  const [rentals, setRentals] = useState([
    {
      id: 1,
      rental_code: 'BONITA-99M1O3',
      customer_name: 'Angel Locsin',
      customer_phone: '09191112223',
      items: [
        { 
          id: 'ITEM-101', 
          code: 'BNT-367981549073', 
          name: 'Modern Filipiniana Gown', 
          color: 'Cream', 
          size: 'Small', 
          rental_price: 2500.00,
          discount: 20, // 20% Off -> ₱2,000 Final Rental
          security_deposit: 500.00 // MAY DEPOSIT
        },
        { 
          id: 'ITEM-102', 
          code: 'BNT-882319203112', 
          name: 'Nude High Heels', 
          color: 'Nude', 
          size: '38', 
          rental_price: 500.00,
          discount: 0, // ₱500 Final Rental
          security_deposit: 0.00 // WALANG DEPOSIT
        }
      ],
      reservation_rate: 0.50, // 50% Down Payment to Reserve
      start_date: '2026-08-28',
      end_date: '2026-08-31',
      payment_method: 'gcash',
      payment_txn_id: 'GCASH-REF-77120012',
      status: 'pending_approval'
    },
    {
      id: 2,
      rental_code: 'BONITA-88X2A1',
      customer_name: 'Maria Santos',
      customer_phone: '09171234567',
      items: [
        { 
          id: 'ITEM-104', 
          code: 'BNT-102938475610', 
          name: 'Red Evening Gown', 
          color: 'Emerald Green', 
          size: 'Medium', 
          rental_price: 1500.00,
          discount: 150, // Fixed ₱150 Off -> ₱1,350 Final Rental
          security_deposit: 1000.00 // MAY DEPOSIT
        }
      ],
      reservation_rate: 0.50,
      start_date: '2026-08-25',
      end_date: '2026-08-27',
      payment_method: 'gcash',
      payment_txn_id: 'GCASH-REF-99238102',
      status: 'ready_for_pickup'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRental, setSelectedRental] = useState(null);

  // Helper Calculations
  const calculateFinalPrice = (rental_price, discount) => {
    if (!discount || discount <= 0) return rental_price;
    if (discount <= 100) {
      return rental_price - (rental_price * (discount / 100));
    }
    return Math.max(0, rental_price - discount);
  };

  const calculateDiscountAmount = (rental_price, discount) => {
    return rental_price - calculateFinalPrice(rental_price, discount);
  };

  const handleApprove = (id) => {
    if (window.confirm('Approve reservation payment? Order will be set to "Ready for Pick-up".')) {
      setRentals(prev => prev.map(r => r.id === id ? { ...r, status: 'ready_for_pickup' } : r));
      if (selectedRental?.id === id) setSelectedRental(null);
    }
  };

  const handleReject = (id) => {
    if (window.confirm('Reject this booking? Make sure to inform customer.')) {
      setRentals(prev => prev.map(r => r.id === id ? { ...r, status: 'cancelled' } : r));
      if (selectedRental?.id === id) setSelectedRental(null);
    }
  };

  const handleHandover = (id) => {
    if (window.confirm('Confirm remaining balance & security deposit payment upon pick-up? Release items now.')) {
      setRentals(prev => prev.map(r => r.id === id ? { ...r, status: 'active' } : r));
      if (selectedRental?.id === id) setSelectedRental(null);
    }
  };

  const filteredRentals = rentals.filter(item => {
    const matchesSearch = 
      item.rental_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.items.some(i => 
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        i.code.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (statusFilter === 'all') {
      return matchesSearch && item.status !== 'cancelled' && item.status !== 'active';
    }
    
    return matchesSearch && item.status === statusFilter;
  });

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'pending_approval':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200/60">
            <AlertCircle className="w-3 h-3" />
            Pending Review
          </span>
        );
      case 'ready_for_pickup':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
            <Clock className="w-3 h-3" />
            Reserved (For Pick-up)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 font-sans">
      <div className="space-y-6 ">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Active Rentals Management</h1>
            <p className="text-xs text-slate-500 mt-0.5">Verify reservation fees, approve schedules, and collect remaining balance on pick-up</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span className="text-xs font-medium text-slate-600">Pending Review:</span>
              <span className="text-xs font-bold text-slate-900">
                {rentals.filter(r => r.status === 'pending_approval').length}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-xs font-medium text-slate-600">For Pick-up:</span>
              <span className="text-xs font-bold text-slate-900">
                {rentals.filter(r => r.status === 'ready_for_pickup').length}
              </span>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search order, customer, SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 shadow-2xs transition"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/60 w-full sm:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Action Needed
            </button>
            <button
              onClick={() => setStatusFilter('pending_approval')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition flex items-center gap-1.5 ${
                statusFilter === 'pending_approval' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending Approval
              {rentals.filter(r => r.status === 'pending_approval').length > 0 && (
                <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                  {rentals.filter(r => r.status === 'pending_approval').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setStatusFilter('ready_for_pickup')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                statusFilter === 'ready_for_pickup' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ready for Pick-up
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
                  <th className="py-3 px-4">Rented Items & Item Deposits</th>
                  <th className="py-3 px-4">Reservation & Balance Status</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredRentals.length > 0 ? (
                  filteredRentals.map((order) => {
                    const grossRental = order.items.reduce((acc, i) => acc + i.rental_price, 0);
                    const totalDiscount = order.items.reduce((acc, i) => acc + calculateDiscountAmount(i.rental_price, i.discount), 0);
                    const finalRentalTotal = grossRental - totalDiscount;
                    const totalDeposit = order.items.reduce((acc, i) => acc + (i.security_deposit || 0), 0);
                    
                    // Reservation Calculations
                    const reservationPaid = finalRentalTotal * (order.reservation_rate || 0.5);
                    const remainingRentBalance = finalRentalTotal - reservationPaid;
                    const amountDueOnPickup = remainingRentBalance + totalDeposit;

                    return (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition">
                        
                        {/* Code & Schedule */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="font-mono font-semibold text-slate-900">{order.rental_code}</div>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            {order.start_date} ➔ {order.end_date}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="py-3.5 px-4 align-top">
                          <span className="font-medium text-slate-800 block">{order.customer_name}</span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-slate-400" /> {order.customer_phone}
                          </span>
                        </td>

                        {/* Items Breakdown with Security Deposit Display */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="text-[11px] text-slate-400 font-medium mb-1.5">
                            {order.items.length} item(s) reserved
                          </div>
                          <div className="space-y-1.5">
                            {order.items.map((prod) => {
                              const finalPrice = calculateFinalPrice(prod.rental_price, prod.discount);
                              const hasDiscount = prod.discount > 0;
                              const hasDeposit = prod.security_deposit && prod.security_deposit > 0;

                              return (
                                <div key={prod.id} className="bg-slate-50/80 p-2 rounded-lg border border-slate-100 space-y-1">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-1.5">
                                      <Package className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                      <div>
                                        <span className="font-medium text-slate-800 block">{prod.name}</span>
                                        <span className="text-[10px] text-slate-400">
                                          {prod.size} • {prod.color}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                      {hasDiscount ? (
                                        <div className="flex flex-col items-end">
                                          <span className="text-[10px] text-slate-400 line-through">
                                            ₱{prod.rental_price.toFixed(2)}
                                          </span>
                                          <span className="font-semibold text-slate-900">
                                            ₱{finalPrice.toFixed(2)}
                                          </span>
                                        </div>
                                      ) : (
                                        <span className="font-semibold text-slate-800">
                                          ₱{prod.rental_price.toFixed(2)}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* SECURITY DEPOSIT ITEM DISPLAY */}
                                  <div className="pt-1 border-t border-slate-200/50 flex items-center justify-between text-[10px]">
                                    <span className="text-slate-400 font-medium">Security Deposit:</span>
                                    {hasDeposit ? (
                                      <span className="inline-flex items-center gap-0.5 text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60 font-semibold">
                                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                                        +₱{prod.security_deposit.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-0.5 text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded font-normal">
                                        <ShieldOff className="w-2.5 h-2.5 text-slate-400" />
                                        No Deposit
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </td>

                        {/* Reservation & Balance Breakdown */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-2 bg-purple-50/60 p-1.5 rounded border border-purple-100">
                              <span className="text-[11px] text-purple-700 font-medium flex items-center gap-1">
                                <CalendarCheck className="w-3 h-3" />
                                Online Res. Fee Paid:
                              </span>
                              <span className="font-bold text-purple-900 font-mono">
                                ₱{reservationPaid.toFixed(2)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-2 bg-amber-50/60 p-1.5 rounded border border-amber-100">
                              <span className="text-[11px] text-amber-800 font-medium flex items-center gap-1">
                                <Wallet className="w-3 h-3" />
                                Collect on Pick-up:
                              </span>
                              <span className="font-bold text-amber-900 font-mono">
                                ₱{amountDueOnPickup.toFixed(2)}
                              </span>
                            </div>

                            <div className="text-[10px] text-slate-400 px-1">
                              *(₱{remainingRentBalance.toFixed(2)} Rent Bal. + ₱{totalDeposit.toFixed(2)} Deposit)*
                            </div>
                          </div>

                          <div className="mt-2 text-[11px] border-t border-slate-100 pt-1">
                            <span className="uppercase font-semibold text-slate-600">{order.payment_method} Ref:</span>
                            <span className="font-mono text-slate-500 block">{order.payment_txn_id}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 text-center align-top">
                          {renderStatusBadge(order.status)}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right align-top">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedRental(order)}
                              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                              title="Preview Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {order.status === 'pending_approval' && (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleApprove(order.id)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition shadow-2xs"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(order.id)}
                                  className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition border border-rose-200/60"
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </div>
                            )}

                            {order.status === 'ready_for_pickup' && (
                              <button
                                onClick={() => handleHandover(order.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-xs transition shadow-2xs"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Collect & Release
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                      No active orders found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Detailed Modal Breakdown */}
      {selectedRental && (() => {
        const grossRental = selectedRental.items.reduce((acc, i) => acc + i.rental_price, 0);
        const totalDiscount = selectedRental.items.reduce((acc, i) => acc + calculateDiscountAmount(i.rental_price, i.discount), 0);
        const finalRentalTotal = grossRental - totalDiscount;
        const totalDeposit = selectedRental.items.reduce((acc, i) => acc + (i.security_deposit || 0), 0);
        
        const reservationPaid = finalRentalTotal * (selectedRental.reservation_rate || 0.5);
        const remainingRentBalance = finalRentalTotal - reservationPaid;
        const amountDueOnPickup = remainingRentBalance + totalDeposit;

        return (
          <div className="fixed inset-0 bg-slate-900/10 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-4 border border-slate-200 shadow-lg max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-semibold text-slate-900 text-sm">Reservation & Billing Breakdown</h3>
                <button 
                  onClick={() => setSelectedRental(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {/* Customer Details */}
                <div className="p-3 bg-slate-50 rounded-lg space-y-1 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rental Code:</span>
                    <span className="font-mono font-semibold text-slate-900">{selectedRental.rental_code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Customer:</span>
                    <span className="font-medium text-slate-800">{selectedRental.customer_name} ({selectedRental.customer_phone})</span>
                  </div>
                </div>

                {/* Items Breakdown with Per-Item Security Deposit Status */}
                <div className="border border-slate-100 bg-slate-50/50 p-3 rounded-lg space-y-2">
                  <span className="text-slate-500 font-medium block">
                    Reserved Items ({selectedRental.items.length}):
                  </span>
                  <div className="space-y-2">
                    {selectedRental.items.map((prod) => {
                      const finalPrice = calculateFinalPrice(prod.rental_price, prod.discount);
                      const discountVal = calculateDiscountAmount(prod.rental_price, prod.discount);
                      const hasDeposit = prod.security_deposit && prod.security_deposit > 0;

                      return (
                        <div key={prod.id} className="bg-white p-2.5 rounded-lg border border-slate-100 space-y-1.5">
                          <div className="flex justify-between">
                            <span className="font-semibold text-slate-800">{prod.name}</span>
                            <span className="font-mono text-slate-400 text-[10px]">{prod.code}</span>
                          </div>
                          
                          <div className="flex justify-between text-[11px] text-slate-500">
                            <span>Base Rental Price:</span>
                            <span className="font-mono">₱{prod.rental_price.toFixed(2)}</span>
                          </div>

                          {prod.discount > 0 && (
                            <div className="flex justify-between text-[11px] text-emerald-600">
                              <span>Discount ({prod.discount <= 100 ? `${prod.discount}%` : `₱${prod.discount}`}):</span>
                              <span className="font-mono">-₱{discountVal.toFixed(2)}</span>
                            </div>
                          )}

                          <div className="flex justify-between text-[11px] text-slate-800 font-semibold pt-0.5 border-t border-slate-100">
                            <span>Final Item Rental:</span>
                            <span className="font-mono">₱{finalPrice.toFixed(2)}</span>
                          </div>

                          {/* DISPLAY PER-ITEM SECURITY DEPOSIT */}
                          <div className="flex justify-between items-center text-[10px] bg-slate-50 p-1.5 rounded">
                            <span className="text-slate-500 font-medium">Security Deposit Required:</span>
                            {hasDeposit ? (
                              <span className="font-mono font-bold text-emerald-700 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                ₱{prod.security_deposit.toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-slate-400 flex items-center gap-1">
                                <ShieldOff className="w-3 h-3 text-slate-400" />
                                None (₱0.00)
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="p-3 bg-slate-50 rounded-lg space-y-1.5 border border-slate-100">
                  <div className="flex justify-between text-slate-500">
                    <span>Total Rental Value:</span>
                    <span className="font-mono text-slate-700">₱{finalRentalTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-purple-700 font-medium border-t border-slate-200/60 pt-1.5">
                    <span className="flex items-center gap-1">
                      <CalendarCheck className="w-3.5 h-3.5" />
                      50% Online Reservation Fee (Paid):
                    </span>
                    <span className="font-mono font-bold">₱{reservationPaid.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Remaining Rental Balance:</span>
                    <span className="font-mono">₱{remainingRentBalance.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Total Security Deposit (Refundable):
                    </span>
                    <span className="font-mono font-semibold text-emerald-700">₱{totalDeposit.toFixed(2)}</span>
                  </div>

                  {/* Pick-up Collect Highlight */}
                  <div className="flex justify-between text-amber-900 font-bold border-t-2 border-amber-300 pt-2 mt-1 text-xs bg-amber-50 p-2 rounded">
                    <span className="flex items-center gap-1">
                      <Wallet className="w-4 h-4 text-amber-700" />
                      Total to Collect on Pick-up Date:
                    </span>
                    <span className="font-mono text-amber-900 text-sm">₱{amountDueOnPickup.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Reference */}
                <div className="p-3 bg-slate-50 rounded-lg space-y-1 border border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Online Method:</span>
                    <span className="font-bold uppercase text-slate-800">{selectedRental.payment_method}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GCash Ref No (Res. Fee):</span>
                    <span className="font-mono text-slate-900 font-semibold">{selectedRental.payment_txn_id}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                {selectedRental.status === 'pending_approval' && (
                  <button
                    onClick={() => handleApprove(selectedRental.id)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition shadow-2xs"
                  >
                    Approve Reservation
                  </button>
                )}

                {selectedRental.status === 'ready_for_pickup' && (
                  <button
                    onClick={() => handleHandover(selectedRental.id)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg transition shadow-2xs"
                  >
                    Confirm Payment & Release Item
                  </button>
                )}

                <button
                  onClick={() => setSelectedRental(null)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default ActiveRentals;