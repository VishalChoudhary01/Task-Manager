import { FiX, FiFlag, FiCalendar, FiClock, FiAlertCircle, FiInfo } from 'react-icons/fi';
import Button from '../atoms/Button/Button';

const priorityConfig = {
  Low: {
    color: 'text-green-600 bg-green-50 border-green-200',
    icon: <FiInfo className="w-4 h-4" />
  },
  Medium: {
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    icon: <FiAlertCircle className="w-4 h-4" />
  },
  High: {
    color: 'text-red-600 bg-red-50 border-red-200',
    icon: <FiFlag className="w-4 h-4" />
  }
};

const TaskCard = ({ task, onDelete }) => {
  const { id, title, description, priority, due_date, created_at } = task;

  return (
    <div className="relative group bg-white dark:bg-dark-card-bg rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-transparent hover:border-opacity-50 hover:border-current">
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          ButtonEvent={() => onDelete(id)}
          ariaLabel="Delete Task"
          buttonStyles="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
          leftIcon={<FiX size={18} />}
        />
      </div>

      <div className={`${priorityConfig[priority].color} inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium mb-3 w-fit`}>
        {priorityConfig[priority].icon}
        {priority} Priority
      </div>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-heading1 mb-1.5">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        {due_date && (
          <div className="flex items-center gap-1.5">
            <FiCalendar className="w-4 h-4 flex-shrink-0" />
            <span>Due {new Date(due_date).toLocaleDateString()}</span>
          </div>
        )}
        
        {created_at && (
          <div className="flex items-center gap-1.5">
            <FiClock className="w-4 h-4 flex-shrink-0" />
            <span>Created {new Date(created_at).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;