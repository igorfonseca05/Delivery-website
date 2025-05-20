

export default function Failure() {
    return (
        <>
            <svg className="errormark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="errormark__circle" cx="26" cy="26" r="25" fill="none" />
                <path className="errormark__cross1" d="M16 16 36 36" fill="none" />
                <path className="errormark__cross2" d="M36 16 16 36" fill="none" />
            </svg>
            <p className='mt-4'>Falha no pagamento, Tente novamente! </p>
        </>

    );
};