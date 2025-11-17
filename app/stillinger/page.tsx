/**
 * PUBLIC JOB LISTINGS PAGE
 * Route: bluecrew.no/stillinger
 *
 * Shows all active job postings to candidates
 * Filterable by category, location, job type
 */

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Building,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Types
type JobPosting = {
  id: string;
  title: string;
  company_name: string | null;
  vessel_name: string | null;
  short_description: string | null;
  description: string;
  job_type: string;
  category: string;
  location: string;
  region: string | null;
  fylke: string;
  kommune: string;
  start_date: string | null;
  salary_text: string | null;
  application_deadline: string | null;
  published_at: string | null;
  slug: string;
  view_count: number;
  application_count: number;
};

export default function StillingerPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Load active jobs
  const loadJobs = async () => {
    setLoading(true);
    try {
      // Fetch from Supabase using public API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admincrew.no'}/api/job-postings?status=active`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    // Category filter
    if (categoryFilter !== "all" && job.category !== categoryFilter) {
      return false;
    }

    // Location filter
    if (locationFilter !== "all" && job.fylke !== locationFilter) {
      return false;
    }

    // Type filter
    if (typeFilter !== "all" && job.job_type !== typeFilter) {
      return false;
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(query) ||
        job.company_name?.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Get unique values for filters
  const categories = Array.from(new Set(jobs.map((j) => j.category)));
  const fylker = Array.from(new Set(jobs.map((j) => j.fylke)));

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Days until deadline
  const daysUntilDeadline = (deadline: string | null) => {
    if (!deadline) return null;
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days < 0) return "Utgått";
    if (days === 0) return "I dag";
    if (days === 1) return "1 dag";
    return `${days} dager`;
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
              <Briefcase className="h-12 w-12" />
              Ledige Stillinger
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Finn din neste jobb innen havbruk, offshore og skipsfart
            </p>
            <div className="flex items-center gap-6 mt-6 text-blue-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>{jobs.length} aktive stillinger</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Søk etter stilling, bedrift eller sted..."
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">Alle kategorier</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">Alle fylker</option>
                {fylker.map((fylke) => (
                  <option key={fylke} value={fylke}>
                    {fylke}
                  </option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">Alle typer</option>
                <option value="Fast">Fast</option>
                <option value="Vikariat">Vikariat</option>
                <option value="Midlertidig">Midlertidig</option>
                <option value="Prosjekt">Prosjekt</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          {(searchQuery ||
            categoryFilter !== "all" ||
            locationFilter !== "all" ||
            typeFilter !== "all") && (
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Viser {filteredJobs.length} av {jobs.length} stillinger
            </div>
          )}
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">
              Laster stillinger...
            </p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Briefcase className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <p className="text-lg text-slate-500 mb-2">
              {searchQuery ||
              categoryFilter !== "all" ||
              locationFilter !== "all" ||
              typeFilter !== "all"
                ? "Ingen stillinger matcher søket ditt"
                : "Ingen aktive stillinger for øyeblikket"}
            </p>
            <p className="text-sm text-slate-400">
              Registrer deg som jobbsøker så kontakter vi deg når nye stillinger
              kommer!
            </p>
            <Link
              href="/jobbsoker"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Registrer deg her
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {filteredJobs.map((job, index) => {
                const deadline = daysUntilDeadline(job.application_deadline);
                const isUrgent =
                  deadline && deadline !== "Utgått" && parseInt(deadline) <= 7;

                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/stillinger/${job.slug}`}>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer group">
                        <div className="flex items-start justify-between gap-4">
                          {/* Left side - Job info */}
                          <div className="flex-1">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {job.title}
                            </h2>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm font-medium">
                                {job.job_type}
                              </span>
                              <span className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-sm font-medium">
                                {job.category}
                              </span>
                              {isUrgent && (
                                <span className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-full text-sm font-medium flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Søk snart!
                                </span>
                              )}
                            </div>

                            {/* Description */}
                            {job.short_description && (
                              <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                                {job.short_description}
                              </p>
                            )}

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              {job.company_name && (
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                  <Building className="w-4 h-4 flex-shrink-0" />
                                  <span className="truncate">{job.company_name}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span>
                                  {job.location}, {job.fylke}
                                </span>
                              </div>
                              {job.application_deadline && (
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                  <Calendar className="w-4 h-4 flex-shrink-0" />
                                  <span>
                                    Søknadsfrist: {formatDate(job.application_deadline)}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Salary */}
                            {job.salary_text && (
                              <div className="mt-3 text-sm font-medium text-green-600 dark:text-green-400">
                                💰 {job.salary_text}
                              </div>
                            )}
                          </div>

                          {/* Right side - CTA */}
                          <div className="flex flex-col items-end gap-3">
                            <div className="px-6 py-3 bg-blue-600 text-white rounded-xl group-hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                              Se stilling
                              <ChevronRight className="h-5 w-5" />
                            </div>

                            {deadline && deadline !== "Utgått" && (
                              <div
                                className={`text-sm font-medium ${
                                  isUrgent
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-slate-500 dark:text-slate-400"
                                }`}
                              >
                                {deadline} igjen
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Call to Action Footer */}
      {filteredJobs.length > 0 && (
        <div className="bg-blue-900 text-white py-12 px-6 mt-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Fant du ikke det du lette etter?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Registrer deg som jobbsøker, så kontakter vi deg når vi får inn stillinger som passer for deg!
            </p>
            <Link
              href="/jobbsoker"
              className="inline-block px-8 py-4 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition-colors font-bold text-lg"
            >
              Registrer deg som jobbsøker
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
