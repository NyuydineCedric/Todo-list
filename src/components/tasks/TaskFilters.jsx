import React from "react";
import { Search, Filter } from "lucide-react";
import "./TaskFilters.css";

const TaskFilters = ({ filters, setFilters, searchQuery, setSearchQuery }) => {
  return (
    <div className="task-filters">
      <div className="search-bar-filter">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="all">All Categories</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;
