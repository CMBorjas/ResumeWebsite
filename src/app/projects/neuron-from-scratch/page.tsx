'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Utility math functions
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x))
const derivSigmoid = (x: number) => {
  const fx = sigmoid(x)
  return fx * (1 - fx)
}
const mseLoss = (yTrue: number[], yPred: number[]) => {
  let sum = 0
  for (let i = 0; i < yTrue.length; i++) {
    sum += Math.pow(yTrue[i] - yPred[i], 2)
  }
  return sum / yTrue.length
}

// Initial dataset (Weight - 135, Height - 66)
const trainingData = [
  { name: 'Alice', weight: -2, height: -1, gender: 1 },
  { name: 'Bob', weight: 25, height: 6, gender: 0 },
  { name: 'Charlie', weight: 17, height: 4, gender: 0 },
  { name: 'Diana', weight: -15, height: -6, gender: 1 }
]

export default function NeuronFromScratchPage() {
  const [weights, setWeights] = useState({
    w1: Math.random(), w2: Math.random(),
    w3: Math.random(), w4: Math.random(),
    w5: Math.random(), w6: Math.random(),
    b1: Math.random(), b2: Math.random(), b3: Math.random()
  })

  const [isTraining, setIsTraining] = useState(false)
  const [epoch, setEpoch] = useState(0)
  const [loss, setLoss] = useState(1.0)
  
  // Inference state
  const [testWeight, setTestWeight] = useState<number>(128)
  const [testHeight, setTestHeight] = useState<number>(63)
  const [prediction, setPrediction] = useState<number | null>(null)

  const [repoStats, setRepoStats] = useState<{ stars: number; forks: number } | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/CMBorjas/neuron-from-scratch-vz')
      .then(res => res.json())
      .then(data => {
        if (data && data.stargazers_count !== undefined) {
          setRepoStats({
            stars: data.stargazers_count,
            forks: data.forks_count
          })
        }
      })
      .catch(console.error)
  }, [])

  const feedforward = (x: [number, number], currentWeights: typeof weights) => {
    const sumH1 = currentWeights.w1 * x[0] + currentWeights.w2 * x[1] + currentWeights.b1
    const h1 = sigmoid(sumH1)

    const sumH2 = currentWeights.w3 * x[0] + currentWeights.w4 * x[1] + currentWeights.b2
    const h2 = sigmoid(sumH2)

    const sumO1 = currentWeights.w5 * h1 + currentWeights.w6 * h2 + currentWeights.b3
    const o1 = sigmoid(sumO1)

    return o1
  }

  const handleTrain = () => {
    if (isTraining) return
    setIsTraining(true)

    let currentW = { ...weights }
    const learnRate = 0.1
    const maxEpochs = 1000
    let currentEpoch = 0

    const interval = setInterval(() => {
      // Run 50 epochs per frame to speed up visual
      for(let step = 0; step < 50; step++) {
        for (const item of trainingData) {
          const x = [item.weight, item.height]
          const yTrue = item.gender

          // Feedforward
          const sumH1 = currentW.w1 * x[0] + currentW.w2 * x[1] + currentW.b1
          const h1 = sigmoid(sumH1)

          const sumH2 = currentW.w3 * x[0] + currentW.w4 * x[1] + currentW.b2
          const h2 = sigmoid(sumH2)

          const sumO1 = currentW.w5 * h1 + currentW.w6 * h2 + currentW.b3
          const o1 = sigmoid(sumO1)
          const yPred = o1

          // Backprop
          const d_L_d_ypred = -2 * (yTrue - yPred)

          const d_ypred_d_w5 = h1 * derivSigmoid(sumO1)
          const d_ypred_d_w6 = h2 * derivSigmoid(sumO1)
          const d_ypred_d_b3 = derivSigmoid(sumO1)

          const d_ypred_d_h1 = currentW.w5 * derivSigmoid(sumO1)
          const d_ypred_d_h2 = currentW.w6 * derivSigmoid(sumO1)

          const d_h1_d_w1 = x[0] * derivSigmoid(sumH1)
          const d_h1_d_w2 = x[1] * derivSigmoid(sumH1)
          const d_h1_d_b1 = derivSigmoid(sumH1)

          const d_h2_d_w3 = x[0] * derivSigmoid(sumH2)
          const d_h2_d_w4 = x[1] * derivSigmoid(sumH2)
          const d_h2_d_b2 = derivSigmoid(sumH2)

          // Updates
          currentW.w1 -= learnRate * d_L_d_ypred * d_ypred_d_h1 * d_h1_d_w1
          currentW.w2 -= learnRate * d_L_d_ypred * d_ypred_d_h1 * d_h1_d_w2
          currentW.b1 -= learnRate * d_L_d_ypred * d_ypred_d_h1 * d_h1_d_b1

          currentW.w3 -= learnRate * d_L_d_ypred * d_ypred_d_h2 * d_h2_d_w3
          currentW.w4 -= learnRate * d_L_d_ypred * d_ypred_d_h2 * d_h2_d_w4
          currentW.b2 -= learnRate * d_L_d_ypred * d_ypred_d_h2 * d_h2_d_b2

          currentW.w5 -= learnRate * d_L_d_ypred * d_ypred_d_w5
          currentW.w6 -= learnRate * d_L_d_ypred * d_ypred_d_w6
          currentW.b3 -= learnRate * d_L_d_ypred * d_ypred_d_b3
        }
        currentEpoch++
      }

      setWeights({ ...currentW })
      setEpoch(currentEpoch)

      const yPreds = trainingData.map(d => feedforward([d.weight, d.height], currentW))
      const yTrues = trainingData.map(d => d.gender)
      setLoss(mseLoss(yTrues, yPreds))

      if (currentEpoch >= maxEpochs) {
        clearInterval(interval)
        setIsTraining(false)
        handleInfer({ ...currentW })
      }
    }, 50)
  }

  const handleInfer = (w = weights) => {
    const shiftWeight = testWeight - 135
    const shiftHeight = testHeight - 66
    const out = feedforward([shiftWeight, shiftHeight], w)
    setPrediction(out)
  }

  useEffect(() => {
    if (!isTraining) {
      handleInfer(weights)
    }
  }, [testWeight, testHeight, isTraining])

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/70 backdrop-blur-md rounded-xl p-6 md:p-8 border-2 border-fuchsia-500/50 shadow-[0_0_15px_color-mix(in_srgb,_var(--color-fuchsia-500)_40%,_transparent)]"
      >
        <h1 className="text-3xl font-bold text-fuchsia-400 mb-2 tracking-wide uppercase">Neuron From Scratch</h1>
        <p className="text-slate-400 mb-6 text-sm">
          A faithful, from-scratch 2-2-1 Neural Network port. Learns to predict gender (Female=1, Male=0) based on weight & height.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Training Panel */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Training Controls</h2>
                <span className="px-2 py-1 bg-slate-700/50 text-xs rounded text-slate-400 font-mono">Epoch: {epoch}/1000</span>
              </div>
              
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">MSE Loss</p>
                  <p className={`text-2xl font-bold font-mono transition-colors ${loss < 0.1 ? 'text-green-400' : 'text-fuchsia-400'}`}>
                    {loss.toFixed(6)}
                  </p>
                </div>
                <button
                  onClick={handleTrain}
                  disabled={isTraining || epoch >= 1000}
                  className="px-6 py-2 bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50 rounded hover:bg-fuchsia-500/40 transition-all font-mono font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm"
                >
                  {isTraining ? 'Training...' : epoch >= 1000 ? 'Trained' : 'Start Training'}
                </button>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                <div 
                  className="bg-fuchsia-500 h-2 rounded-full transition-all duration-200" 
                  style={{ width: `${(epoch / 1000) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Inference Panel */}
            <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
              <h2 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Inference / Testing</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Weight (lbs)</label>
                  <input
                    type="number"
                    value={testWeight}
                    onChange={(e) => setTestWeight(Number(e.target.value))}
                    className="w-full bg-slate-900 text-slate-200 border border-slate-700 rounded p-2 focus:outline-none focus:border-fuchsia-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Height (in)</label>
                  <input
                    type="number"
                    value={testHeight}
                    onChange={(e) => setTestHeight(Number(e.target.value))}
                    className="w-full bg-slate-900 text-slate-200 border border-slate-700 rounded p-2 focus:outline-none focus:border-fuchsia-400 font-mono"
                  />
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded border border-slate-700 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Prediction Output</p>
                  <p className="text-sm font-mono text-slate-300">
                    {prediction !== null ? prediction.toFixed(4) : '--'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Class</p>
                  {prediction !== null ? (
                    prediction > 0.5 ? 
                      <span className="text-fuchsia-400 font-bold tracking-widest uppercase">Female</span> : 
                      <span className="text-cyan-400 font-bold tracking-widest uppercase">Male</span>
                  ) : '--'}
                </div>
              </div>
            </div>
          </div>

          {/* Network Visualization Panel */}
          <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700 flex flex-col items-center">
            <h2 className="text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider w-full border-b border-slate-700 pb-2">Visual Network Diagram</h2>
            <p className="text-xs text-slate-400 mb-6 text-center">Watch the lines change as the AI learns! Thicker lines mean stronger connections.</p>
            
            <div className="relative w-full max-w-[400px] aspect-square bg-slate-900/50 rounded-xl border border-slate-700 p-4">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {/* Lines (Weights) */}
                <g className="transition-all duration-300 ease-in-out">
                  {/* w1: in1 -> h1 */}
                  <line x1="20" y1="25" x2="50" y2="30" stroke={weights.w1 > 0 ? '#4ade80' : '#f87171'} strokeWidth={Math.max(0.5, Math.abs(weights.w1))} strokeOpacity={0.6} />
                  {/* w2: in2 -> h1 */}
                  <line x1="20" y1="75" x2="50" y2="30" stroke={weights.w2 > 0 ? '#4ade80' : '#f87171'} strokeWidth={Math.max(0.5, Math.abs(weights.w2))} strokeOpacity={0.6} />
                  {/* w3: in1 -> h2 */}
                  <line x1="20" y1="25" x2="50" y2="70" stroke={weights.w3 > 0 ? '#4ade80' : '#f87171'} strokeWidth={Math.max(0.5, Math.abs(weights.w3))} strokeOpacity={0.6} />
                  {/* w4: in2 -> h2 */}
                  <line x1="20" y1="75" x2="50" y2="70" stroke={weights.w4 > 0 ? '#4ade80' : '#f87171'} strokeWidth={Math.max(0.5, Math.abs(weights.w4))} strokeOpacity={0.6} />
                  {/* w5: h1 -> o1 */}
                  <line x1="50" y1="30" x2="80" y2="50" stroke={weights.w5 > 0 ? '#4ade80' : '#f87171'} strokeWidth={Math.max(0.5, Math.abs(weights.w5))} strokeOpacity={0.6} />
                  {/* w6: h2 -> o1 */}
                  <line x1="50" y1="70" x2="80" y2="50" stroke={weights.w6 > 0 ? '#4ade80' : '#f87171'} strokeWidth={Math.max(0.5, Math.abs(weights.w6))} strokeOpacity={0.6} />
                </g>

                {/* Nodes */}
                <g className="fill-fuchsia-500 stroke-slate-800 stroke-2">
                  {/* Inputs */}
                  <circle cx="20" cy="25" r="8" className="fill-brand-cyan/20 stroke-brand-cyan shadow-lg shadow-cyan-500/50" />
                  <circle cx="20" cy="75" r="8" className="fill-brand-cyan/20 stroke-brand-cyan" />
                  
                  {/* Hidden */}
                  <circle cx="50" cy="30" r="8" />
                  <circle cx="50" cy="70" r="8" />
                  
                  {/* Output */}
                  <circle cx="80" cy="50" r="10" className="fill-yellow-400/20 stroke-yellow-400" />
                </g>

                {/* Labels/Icons */}
                <g transform="translate(16, 23) scale(0.35)" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18"/><path d="m3 7 9-4 9 4"/><path d="M5 7l-2 9c0 1.5 1.5 2 3 2s3-.5 3-2l-2-9"/><path d="M19 7l-2 9c0 1.5 1.5 2 3 2s3-.5 3-2l-2-9"/><path d="M9 21h6"/>
                </g>
                <g transform="translate(16, 73) scale(0.35)" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.3 15.3l-6.6 6.6a2.83 2.83 0 0 1-4 0l-8.6-8.6a2.83 2.83 0 0 1 0-4l6.6-6.6a2.83 2.83 0 0 1 4 0l8.6 8.6a2.83 2.83 0 0 1 0 4z"/><path d="M14.5 5.5l4 4"/><path d="M12 8l2 2"/><path d="M9.5 10.5l4 4"/><path d="M7 13l2 2"/>
                </g>
                <text x="50" y="32" fontSize="5" fill="white" textAnchor="middle" className="select-none font-bold">H1</text>
                <text x="50" y="72" fontSize="5" fill="white" textAnchor="middle" className="select-none font-bold">H2</text>
                
                <text x="80" y="52.5" fontSize="8" textAnchor="middle" className="select-none font-bold">
                  {prediction !== null ? (
                    prediction > 0.5 ? 
                      <tspan fill="#e879f9">♀</tspan> : 
                      <tspan fill="#22d3ee">♂</tspan>
                  ) : (
                    <tspan fill="#fbbf24">?</tspan>
                  )}
                </text>
              </svg>

              <div className="absolute top-2 left-2 text-[10px] text-brand-cyan uppercase font-bold tracking-widest">Inputs</div>
              <div className="absolute top-2 left-[42%] text-[10px] text-fuchsia-400 uppercase font-bold tracking-widest">Brain</div>
              <div className="absolute top-2 right-2 text-[10px] text-yellow-400 uppercase font-bold tracking-widest">Output</div>
            </div>

            <div className="w-full flex justify-between mt-4 text-[10px] uppercase font-bold text-slate-500">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-green-400 inline-block"></span> Positive</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-400 inline-block"></span> Negative</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* GitHub Repo Bento Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 w-full"
      >
        <a 
          href="https://github.com/CMBorjas/neuron-from-scratch-vz"
          target="_blank"
          rel="noreferrer"
          className="bg-slate-900/70 backdrop-blur-md rounded-xl p-5 border-2 border-fuchsia-500/50 hover:border-fuchsia-500 hover:shadow-[0_0_15px_color-mix(in_srgb,_var(--color-fuchsia-500)_60%,_transparent)] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between group gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-fuchsia-500/10 rounded-lg group-hover:bg-fuchsia-500/20 transition-colors">
              <svg className="w-8 h-8 text-fuchsia-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors text-lg">neuron-from-scratch-vz</h3>
              <p className="text-sm text-slate-400">View Python source, tests, and MkDocs on GitHub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-mono w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-700/50 pt-4 sm:pt-0">
            {repoStats ? (
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.4)]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
                  <span className="text-base font-bold">{repoStats.stars}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 16 16"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg>
                  <span className="text-base font-bold">{repoStats.forks}</span>
                </div>
              </div>
            ) : (
              <span className="text-slate-500 animate-pulse">Loading stats...</span>
            )}
            <div className="text-fuchsia-400 group-hover:translate-x-2 transition-transform bg-fuchsia-500/10 p-2 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  )
}
