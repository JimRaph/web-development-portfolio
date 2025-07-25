import Footer from "./footer"
import Header from "./Header"

const LayOut = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header  />
                <main className="flex-1">
                    {children}
                </main>
            <Footer />
        </div>
    )
}

export default LayOut