import { useNavigate } from "react-router"
import { useEffect } from "react";
import Flex from "../components/Flex/Flex";

const PageNotFound = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/")
        },2000)
    }, [])
  return (
    <>
    <Flex>
    <h3>Pagina no encontrada, redireccionando a la pagina principal</h3>
    </Flex>
    </>
  )
}

export default PageNotFound