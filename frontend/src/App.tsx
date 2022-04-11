import './App.scss';

function App() {
  return (
    <div className="wrapper">
      <div className="category-list">
        <div className="category-item">
          All
        </div>
        <div className="category-item">
          Groceries
        </div>
        <div className="category-item">
          College
        </div>
      </div>
      <div className="content">
        <h1>All Tasks</h1>
        <div className="new-task">
          <input type="text" placeholder='Add a new task insdie ‘All’ category' />
        </div>
        <div className="task-list">
          <div className="task-item">
            <img className='checkbox' src="/img/checked.svg" alt="checked" width={28} height={28} />
            <p>Get a new helmet <div className='item-category'>Uncategorized</div></p>
            <img className='delete' src="/img/delete.png" alt="delete" width={14} height={16} />
          </div>
          <div className="task-item">
            <img className='checkbox' src="/img/unchecked.svg" alt="unchecked" width={28} height={28} />
            <p>Purchase Milk & Corn Flakes <div className='item-category'>Groceries</div></p>
            <img className='delete' src="/img/delete.png" alt="delete" width={14} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
