import { useContext } from "react";
import { AuthUserContext } from "../hooks/useContext/AuthContext";
import { Link } from 'react-router-dom';
const Navigation = ({ setIsLoginOpen, setIsRegisterOpen }) => {
    const { user, token } = useContext(AuthUserContext);

    return (
        <div className="p-3 border-b-2 flex justify-end items-center">
            <div className="flex items-center gap-2">
                {token ? (
                    <>
                        <div className="flex items-center gap-2">
                            <Link to={'/'} />

                            <img
                                className="w-[40px] rounded-full"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTO8H6mRVR83mbxemvDIPW8rbiLZ1b8XVl6Q&s"
                                alt="User Avatar"
                            />
                            <Link />


                            {user?.username && (
                                <span className="font-semibold">{user.username}</span>
                            )}
                            {user.admin === true && <div>
                                <Link to={'/admin'}>Admin</Link>
                            </div>}


                        </div>
                    </>
                ) : (
                    <div className="flex gap-2 items-center">
                        <button
                            className="border-2 border-pink-300 p-1 rounded-[5px] w-[100px]"
                            onClick={setIsRegisterOpen}
                        >
                            Đăng Ký
                        </button>
                        <button
                            className="border-2 border-pink-300 p-1 rounded-[5px] w-[100px]"
                            onClick={setIsLoginOpen}
                        >
                            Đăng Nhập
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navigation;
