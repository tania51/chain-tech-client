import { Link } from "react-router-dom";


const Home = ({children}) => {
    return (
        <div className="flex gap-5">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    {children}

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-full min-h-full bg-gray-950 text-white border-r-2 border-amber-500 text-xl pt-20">
                        {/* Sidebar content here */}
                        <li><Link to="/create-task">Create Task</Link></li>
                        <li><Link to="/">View Task</Link></li>
                    </ul>

                </div>
            </div>
            
        </div>
    );
};

export default Home;