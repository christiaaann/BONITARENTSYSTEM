import React, { useState, useEffect, useMemo } from 'react'
import {
  LayoutGrid,
  Shirt,
  Scissors,
  RotateCcw,
  Package,
  Wrench,
  Users,
  Receipt,
  TrendingUp,
  Download,
  Search,
  RotateCw,
  Loader2,
  Calendar,
  AlertCircle
} from 'lucide-react'
import UserLineChart from '../components/UserLineChart'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { items, setItems } = useAuth();
  const [rentals, setRentals] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter States
  const [timeframe, setTimeframe] = useState('30d') // '7d' | '30d' | '90d' | 'all'
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch users list (kung may backend API)
      const usersRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users`).catch(() => null)
      if (usersRes && usersRes.ok) {
        const usersData = await usersRes.json()
        setUsers(Array.isArray(usersData) ? usersData : [])
      }

      // Halimbawa ng fetch ng rental records
      const rentalsRes = await fetch(`${import.meta.env.VITE_API_URL}/api/rentals`).catch(() => null)
      if (rentalsRes && rentalsRes.ok) {
        const rentalsData = await rentalsRes.json()
        setRentals(Array.isArray(rentalsData) ? rentalsData : [])
      }
     
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Could not load overview metrics.')
    } finally {
      setLoading(false)
    }
  }

  // 1. Operational Metrics (Naka-base sa mga features ng Sidebar)
  const metrics = useMemo(() => {
    const totalClients = users.length || 0
    const pendingRentals = 5 
    const overdueReturns = 2 
    const activeInventory = items.length || 0 
    
    return {
      totalClients,
      pendingRentals,
      overdueReturns,
      activeInventory,
      activeRentals: 12,
      fittingsToday: 3,
      laundryCount: 4
    }
  }, [users, rentals, items])

  // 2. Search Filter para sa Recent Rentals / Activity Table
  const filteredRentals = useMemo(() => {
    if (!searchQuery.trim()) return rentals.slice(0, 5)
    return rentals.filter(
      (r) =>
        r.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.itemGown?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.status?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [rentals, searchQuery])

  // 3. Export CSV Function para sa Rental Activity
  const handleExportCSV = () => {
    if (!rentals.length) return
    const headers = ['Rental ID', 'Client Name', 'Gown/Item', 'Status', 'Return Date', 'Amount']
    const rows = rentals.map((r) => [
      r.id || '',
      `"${r.clientName || ''}"`,
      `"${r.itemGown || ''}"`,
      r.status || 'Active',
      r.returnDate || '',
      r.amount || 0
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `bonita_rentals_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-6 md:p-8 font-sans">
      {/* Top Bar Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            BONITA Overview
          </h1>
          <p className="text-xs text-stone-500">
            Real-time status of rentals, gown inventory, fittings, and payments.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe Selector */}
          <div className="flex rounded-xl border border-stone-200/80 bg-white p-1 shadow-sm">
            {['7d', '30d', '90d', 'all'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                  timeframe === tf
                    ? 'bg-neutral-200 text-black'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {tf.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="rounded-xl border border-stone-200/80 bg-white p-2 text-stone-600 shadow-sm transition-colors hover:bg-stone-50 disabled:opacity-50"
            title="Refresh System Data"
          >
            <RotateCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-xl bg-neutral-1  00 px-3.5 py-2 text-xs font-semibold text-black shadow-sm transition-all hover:bg-neutral-200 active:scale-95 cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Grid Stat Cards (Naka-pattern sa Features ng Sidebar) */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active & Pending Rentals */}
        <div className="flex items-center gap-4 rounded-2xl border border-stone-200/70 bg-white p-4 shadow-sm">
          <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
            <Shirt className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
              Active Rentals
            </span>
            <p className="text-2xl font-bold text-stone-900">
              {loading ? <Loader2 className="h-6 w-6 animate-spin text-amber-500" /> : metrics.activeRentals}
            </p>
            <span className="text-[10px] text-amber-600 font-medium">
              {metrics.pendingRentals} Pending Confirmation
            </span>
          </div>
        </div>

        {/* Returns & Overdue */}
        <div className="flex items-center gap-4 rounded-2xl border border-stone-200/70 bg-white p-4 shadow-sm">
          <div className="rounded-xl bg-red-50 p-3 text-red-600">
            <RotateCcw className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
              Overdue Returns
            </span>
            <p className="text-2xl font-bold text-stone-900">
              {loading ? <Loader2 className="h-6 w-6 animate-spin text-red-500" /> : metrics.overdueReturns}
            </p>
            <span className="text-[10px] text-red-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3 inline" /> Requires Follow-up
            </span>
          </div>
        </div>

        {/* Gowns & Inventory */}
        <div className="flex items-center gap-4 rounded-2xl border border-stone-200/70 bg-white p-4 shadow-sm">
          <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
              Total Gowns & Stock
            </span>
            <p className="text-2xl font-bold text-stone-900">
              {loading ? <Loader2 className="h-6 w-6 animate-spin text-violet-500" /> : metrics.activeInventory}
            </p>
            <span className="text-[10px] text-stone-500 font-medium">
              Available in Catalog
            </span>
          </div>
        </div>

        {/* Fitting Appointments */}
        <div className="flex items-center gap-4 rounded-2xl border border-stone-200/70 bg-white p-4 shadow-sm">
          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
            <Scissors className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
              Fitting Schedule
            </span>
            <p className="text-2xl font-bold text-stone-900">
              {loading ? <Loader2 className="h-6 w-6 animate-spin text-indigo-500" /> : metrics.fittingsToday}
            </p>
            <span className="text-[10px] text-indigo-600 font-medium">
              Scheduled Today
            </span>
          </div>
        </div>
      </div>

      {/* Main Charts & Operations Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Rental Analytics / Registration Chart (Spans 2 columns) */}
        <div className="lg:col-span-2 rounded-2xl border border-stone-200/70 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Rental & Booking Trends
              </h2>
              <p className="text-xs text-stone-400">
                Performance chart for the selected period ({timeframe.toUpperCase()})
              </p>
            </div>
            <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-lg">
              Active Sync
            </span>
          </div>

          <UserLineChart users={users} timeframe={timeframe} isLoading={loading} />
        </div>

        {/* Quick Operations Summary */}
        <div className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="mb-4 text-base font-bold text-stone-900">
              Quick Operations
            </h2>

            <div className="space-y-3">
              {/* Laundry Status */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-800">Laundry & Maintenance</p>
                    <p className="text-[10px] text-stone-400">Items being cleaned</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-stone-800 bg-white px-2 py-1 rounded-md border border-stone-200">
                  {metrics.laundryCount} items
                </span>
              </div>

              {/* Registered Clients */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-800">Users & Clients</p>
                    <p className="text-[10px] text-stone-400">Total registered accounts</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-stone-800 bg-white px-2 py-1 rounded-md border border-stone-200">
                  {metrics.totalClients}
                </span>
              </div>

              {/* Transactions & Payments */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-800">Transactions</p>
                    <p className="text-[10px] text-stone-400">Recent payment logs</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-white px-2 py-1 rounded-md border border-stone-200">
                  Healthy
                </span>
              </div>
            </div>
          </div>

          {/* Quick Search Section */}
          <div className="mt-6 pt-4 border-t border-stone-100">
            <p className="text-xs font-semibold text-stone-700 mb-2">Search Recent Activity</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search client or gown..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-stone-200/80 bg-stone-50 pl-8 pr-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:border-violet-500 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
