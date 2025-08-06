// src/components/TaskList.jsx
import React from 'react';

// Example props: tasks (array), onDelete (function), onComplete (function)
export default function TaskList({ tasks = [], onDelete, onComplete }) {
  if (!tasks.length) {
    return (
      <div className="mt-10 text-center text-neutral-content opacity-70">
        <span className="italic">No tasks yet. Enjoy your free time!</span>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4 w-full max-w-2xl mx-auto mt-8">
      {tasks.map((task) => (
        <article
          key={task._id || task.id}
          className={`card card-bordered p-0 bg-base-100 shadow-md transition relative flex flex-col sm:flex-row items-center justify-between ${
            task.status ? 'opacity-60' : ''
          }`}
        >
          <div className="p-4 flex-1 w-full">
            <h3
              className={`text-lg font-semibold break-words ${
                task.status ? 'line-through text-secondary' : ''
              }`}
            >
              {task.taskName}
            </h3>
            {task.description && (
              <p
                className={`text-sm text-base-content/70 mt-1 ${
                  task.status ? 'line-through' : ''
                }`}
              >
                {task.description}
              </p>
            )}
          </div>
          <div className="flex flex-row gap-2 p-4 sm:p-0">
            {/* Complete button only if not done */}
            {!task.status && (
              <button
                className="btn btn-success btn-sm"
                onClick={() => onComplete && onComplete(task)}
                aria-label="Mark task as complete"
              >
                ✅
              </button>
            )}
            <button
              className="btn btn-error btn-sm"
              onClick={() => onDelete && onDelete(task)}
              aria-label="Delete task"
            >
              🗑️
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
