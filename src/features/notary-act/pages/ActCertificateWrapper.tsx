import { ActProvider } from "../context/ActContext"
import { ActCertificatePage } from "./ActCertificatePage"

export const ActCertificateWrapper = () => {
    return (
        <ActProvider>
            <ActCertificatePage/>
        </ActProvider>
    )
}