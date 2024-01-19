import LoginForm from "./ui/login/loginForm";

export default function Page() {
    return (
        <div className="bg-gray w-full min-h-screen flex justify-center items-center">
            <div className="bg-white h-3/4 p-2 rounded-lg shadow-lg">
                <LoginForm />
            </div>
        </div>
        
    )
}