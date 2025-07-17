import Hero from "../components/hero"
import Products from "../components/products"
import LayOut from "../layouts/layout"


const HomePage = () =>{
    return(
        <LayOut>
            <Hero />
            <Products />
        </LayOut>
    )
}

export default HomePage