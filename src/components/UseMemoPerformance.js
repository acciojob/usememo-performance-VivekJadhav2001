import React, { useEffect, useMemo, useState } from 'react'

function UseMemoPerformance() {
  const [allTasks, setAllTasks] = useState([])
  const [filter, setFilter] = useState("all")
  const [darkMode, setDarkMode] = useState(false)

  // Generate tasks once
  useEffect(() => {
    const generated = []
    for (let i = 1; i <= 50; i++) {
      generated.push({
        id: i,
        title: `Todo ${i}`,
        status: i <= 25, // first 25 completed
      })
    }
    setAllTasks(generated)
  }, [])

  // Artificial slow function
  const slowDown = () => {
    let total = 0
    for (let i = 0; i < 1e8; i++) total += i
    return total
  }

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    slowDown()
    if (filter === "active") return allTasks.filter(t => !t.status)
    if (filter === "completed") return allTasks.filter(t => t.status)
    return allTasks
  }, [filter, allTasks])

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-4" : "bg-white text-black min-h-screen p-4"}>
      <div className="buttons mb-4">
        <button onClick={() => setFilter("all")} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">All</button>
        <button onClick={() => setFilter("active")} className="bg-red-600 text-white px-4 py-2 rounded mr-2">Active</button>
        <button onClick={() => setFilter("completed")} className="bg-green-600 text-white px-4 py-2 rounded mr-2">Completed</button>
        <button onClick={() => setDarkMode(prev => !prev)} className="bg-gray-500 text-white px-4 py-2 rounded">Toggle Dark Mode</button>
      </div>

      <h2>Note: List is artificially slowed down!</h2>
      <ul className="mt-3">
        {filteredTasks.map(task => (
          <li key={task.id} className={task.status ? "line-through" : ""}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UseMemoPerformance
