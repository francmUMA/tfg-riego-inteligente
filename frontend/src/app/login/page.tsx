import LoginForm from "../ui/login/LoginForm";

export default function Page() {
    return (
        <main className="flex justify-center h-screen items-center">
            <div className="flex bg-white justify-center w-5/6 h-5/6 shadow-xl rounded-xl">
                <LoginForm />
            </div>
        </main>
        
    )
}