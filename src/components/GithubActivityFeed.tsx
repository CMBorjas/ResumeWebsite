'use client'

import React from 'react'
import { GitCommit, GitPullRequest, Star, GitFork, BookOpen, AlertCircle, Code, Eye } from 'lucide-react'

// Define the type for the GitHub event
export interface GitHubEvent {
  id: string
  type: string
  actor: {
    login: string
    avatar_url: string
  }
  repo: {
    name: string
  }
  payload: any
  created_at: string
}

interface GithubActivityFeedProps {
  events: GitHubEvent[]
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'PushEvent': return <GitCommit className="w-3.5 h-3.5 text-brand-cyan" />
    case 'PullRequestEvent': return <GitPullRequest className="w-3.5 h-3.5 text-brand-pink" />
    case 'WatchEvent': return <Star className="w-3.5 h-3.5 text-yellow-400" />
    case 'ForkEvent': return <GitFork className="w-3.5 h-3.5 text-green-400" />
    case 'IssuesEvent': return <AlertCircle className="w-3.5 h-3.5 text-red-400" />
    case 'CreateEvent': return <BookOpen className="w-3.5 h-3.5 text-blue-400" />
    case 'PublicEvent': return <Eye className="w-3.5 h-3.5 text-purple-400" />
    default: return <Code className="w-3.5 h-3.5 text-slate-400" />
  }
}

const formatEventAction = (event: GitHubEvent) => {
  const repoName = event.repo.name.split('/').pop() || event.repo.name;
  switch (event.type) {
    case 'PushEvent':
      const commits = event.payload.commits?.length || 0;
      return <span>Pushed {commits} commit{commits !== 1 ? 's' : ''} to <span className="text-white font-semibold">{repoName}</span></span>
    case 'PullRequestEvent':
      const action = event.payload.action;
      return <span>{action === 'opened' ? 'Opened' : 'Closed'} PR in <span className="text-white font-semibold">{repoName}</span></span>
    case 'WatchEvent':
      return <span>Starred <span className="text-white font-semibold">{repoName}</span></span>
    case 'ForkEvent':
      return <span>Forked <span className="text-white font-semibold">{repoName}</span></span>
    case 'IssuesEvent':
      return <span>{event.payload.action} issue in <span className="text-white font-semibold">{repoName}</span></span>
    case 'CreateEvent':
      return <span>Created {event.payload.ref_type} in <span className="text-white font-semibold">{repoName}</span></span>
    case 'PublicEvent':
      return <span>Made <span className="text-white font-semibold">{repoName}</span> public</span>
    default:
      return <span>Activity in <span className="text-white font-semibold">{repoName}</span></span>
  }
}

const timeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function GithubActivityFeed({ events }: GithubActivityFeedProps) {
  return (
    <div className="relative bg-slate-900/70 backdrop-blur-md rounded-xl border-2 border-brand-pink/50 shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-pink)_40%,transparent)] flex flex-col overflow-hidden h-fit lg:sticky lg:top-8">
      {/* Header Bar */}
      <div className="w-full h-10 bg-brand-pink/10 border-b border-brand-pink/30 flex items-center px-4 justify-between backdrop-blur-md font-mono shrink-0">
        <span className="text-[11px] text-brand-pink tracking-widest font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse"></span>
          ~/ACTIVITY_LOG
        </span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar max-h-[600px] lg:max-h-[800px]">
        {events.length === 0 ? (
          <p className="text-slate-400 text-xs font-mono text-center py-8">No recent activity found.</p>
        ) : (
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-pink/50 before:to-transparent">
            {events.map((event) => (
              <div key={event.id} className="relative flex items-start group">
                {/* Icon */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-700 bg-slate-900 group-hover:border-brand-pink shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-pink)_20%,transparent)] shrink-0 relative z-10 transition-colors mt-0.5">
                  {getEventIcon(event.type)}
                </div>
                {/* Content */}
                <div className="ml-4 flex-1 p-2.5 rounded-lg border border-slate-800 bg-slate-800/30 group-hover:bg-slate-800/50 group-hover:border-brand-pink/50 transition-colors shadow-sm">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-slate-300 font-mono leading-relaxed">
                      {formatEventAction(event)}
                    </span>
                    <span className="text-[9px] text-brand-pink/70 font-mono font-bold tracking-widest uppercase">
                      {timeAgo(event.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
