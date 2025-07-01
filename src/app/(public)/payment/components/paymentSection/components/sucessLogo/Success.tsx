

export function Success({ setSuccess }: { setSuccess: (success: boolean) => void }) {
    return (
        <div onClick={() => setSuccess(false)}>
            <svg className="checkmark" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            <p className='mt-4'>Pagamento realizado com sucesso</p>
        </div>
    )
}