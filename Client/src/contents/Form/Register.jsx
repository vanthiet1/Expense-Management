import { useFormik } from "formik";
import { createPortal } from "react-dom";
import AuthService from "../../services/auth/authService";
import { showToastError, showToastSuccess } from "../../config/toastConfig";
const Register = (props) => {
    const { isRegisterOpen, onClose , setIsLoginOpen } = props;

    if (!isRegisterOpen) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formilk = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                const data = await AuthService.Register(values);
                console.log(data);
                if (!data) {
                    return
                }
                showToastSuccess("đăng ký thành công")
                onClose()
                setIsLoginOpen()
                console.log(data);
                formilk.resetForm();
            } catch (error) {
                showToastError(error.response.data.message);
            }
        }
    })
    return createPortal(
        <>
            <form className="max-w-sm mx-auto" method="POST" onSubmit={formilk.handleSubmit}>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>
                <div className="z-50 fixed inset-0 w-[40%] bg-[#CF3D84] p-5 left-[30%]">
                 <div className="flex items-center gap-5">
                 <img className="w-[200px]" src="https://is.vnecdn.net/v992/33/13/01/4011333/assets/images/momo-doll.png" alt="" />
                 <h1 className="text-center font-bold text-[30px] text-[#fff]">Đăng ký</h1>
                 </div>
                    <div className="mb-5  ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên của bạn</label>
                        <input
                            type="text"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username"
                            required
                            value={formilk.values.username}
                            onChange={formilk.handleChange}
                        />
                    </div>
                    <div className="mb-5  ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email của bạn</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required
                            value={formilk.values.email}
                            onChange={formilk.handleChange}
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu của bạn</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            placeholder="abc@*^$#"
                            value={formilk.values.password}
                            onChange={formilk.handleChange} />
                    </div>

                    <button type="submit" className="text-[#333] bg-[#fff]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5  text-centerdark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2 py-3">Đăng ký</button>

                </div>
            </form>
        </>,
        document.getElementById('portal-root')
    );
};

export default Register;