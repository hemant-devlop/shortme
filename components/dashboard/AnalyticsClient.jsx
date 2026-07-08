"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#60A5FA", "#34D399", "#F59E0B", "#F87171", "#A78BFA", "#F472B6"];

export default function AnalyticsClient({ links }) {
  const [selected, setSelected] = useState(links?.[0]?._id || null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    (async () => {
      try {
        const res = await api.get(`/analytics/summary?linkId=${selected}`);
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [selected]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-64 bg-zinc-900 rounded-xl p-4">
          <h4 className="font-semibold mb-3">Your Links</h4>

          <div className="space-y-2">
            {links.map((l) => (
              <button
                key={l._id}
                className={`w-full text-left px-3 py-2 rounded ${selected === l._id ? "bg-zinc-800" : "hover:bg-zinc-900"}`}
                onClick={() => setSelected(l._id)}
              >
                <div className="truncate">{l.originalUrl}</div>
                <div className="text-sm text-gray-400">Clicks: {l.clicks}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="bg-zinc-900 rounded-xl p-4">
            <h4 className="font-semibold mb-3">Overview</h4>

            {loading && <div className="text-gray-400">Loading analytics...</div>}

            {!loading && data && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2 bg-zinc-800 p-3 rounded">
                  <h5 className="text-sm text-gray-300 mb-2">Daily Clicks (last 30 days)</h5>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data.daily.map(d => ({ date: d._id, count: d.count }))}>
                      <XAxis dataKey="date" tick={{ fill: '#9CA3AF' }} />
                      <YAxis tick={{ fill: '#9CA3AF' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#60A5FA" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="col-span-1 bg-zinc-800 p-3 rounded">
                  <h5 className="text-sm text-gray-300 mb-2">By Browser</h5>
                  <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                      <Pie data={data.browsers.map(b => ({ name: b._id || 'Unknown', value: b.count }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={40}>
                        {data.browsers.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>

                  <h5 className="text-sm text-gray-300 mt-4 mb-2">By Country</h5>
                  <div className="space-y-1 text-sm text-gray-300">
                    {data.countries.slice(0,6).map((c, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{c._id || 'Unknown'}</span>
                        <span>{c.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!loading && !data && <div className="text-gray-400">No analytics available.</div>}
          </div>

        </div>
      </div>
    </div>
  );
}
