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
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:w-72">
          <h4 className="mb-3 text-[15px] font-semibold text-gray-900">Your Links</h4>

          <div className="space-y-2">
            {links.map((l) => (
              <button
                key={l._id}
                className={`w-full rounded-2xl px-3 py-2 text-left transition ${
                  selected === l._id
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                    : "bg-gray-50 text-gray-700 hover:bg-violet-50 hover:text-violet-700"
                }`}
                onClick={() => setSelected(l._id)}
              >
                <div className="truncate text-sm font-medium">{l.originalUrl}</div>
                <div className={`mt-1 text-xs ${selected === l._id ? "text-violet-100" : "text-gray-500"}`}>
                  Clicks: {l.clicks}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <h4 className="mb-3 text-[15px] font-semibold text-gray-900">Overview</h4>

            {loading && <div className="text-sm text-gray-500">Loading analytics...</div>}

            {!loading && data && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="col-span-1 rounded-2xl border border-gray-200 bg-gray-50 p-3 md:col-span-2">
                  <h5 className="mb-2 text-sm font-semibold text-gray-700">Daily Clicks (last 30 days)</h5>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data.daily.map((d) => ({ date: d._id, count: d.count }))}>
                      <XAxis dataKey="date" tick={{ fill: "#6B7280" }} />
                      <YAxis tick={{ fill: "#6B7280" }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#6D28D9" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="col-span-1 rounded-2xl border border-gray-200 bg-gray-50 p-3">
                  <h5 className="mb-2 text-sm font-semibold text-gray-700">By Browser</h5>
                  <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                      <Pie
                        data={data.browsers.map((b) => ({ name: b._id || "Unknown", value: b.count }))}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={40}
                      >
                        {data.browsers.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>

                  <h5 className="mt-4 mb-2 text-sm font-semibold text-gray-700">By Country</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    {data.countries.slice(0, 6).map((c, i) => (
                      <div key={i} className="flex justify-between gap-2">
                        <span>{c._id || "Unknown"}</span>
                        <span>{c.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!loading && !data && <div className="text-sm text-gray-500">No analytics available.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
