import {Link} from "react-router-dom"

export default function Index() {
    return <>
        <h1>Сервис поиска специалистов</h1>
        <p>Тут вы можете разместить объявления о своих услугах, а также найти специалистов в различных областях</p>
        <Link to="/jobs">Перейти к объявлениям</Link>
    </>
}