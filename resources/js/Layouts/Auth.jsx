import Front from "./Front";

export default function Guest({ children }) {
    return (
        <Front>
            <div className="max-w-4xl mx-auto py-10 px-5 mt-[80px] bg-white rounded-lg shadow">
                {children}
            </div>
        </Front>
    );
}
