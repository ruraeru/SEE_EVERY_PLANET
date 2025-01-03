const NamePage = async () => {
    return (
        <div>
            <div className="flex flex-col items-center">
                <div>
                    <input name="name" placeholder="이름을 입력해주세요" className="placeholder:text-black" />
                </div>
                <div>
                    <input name="birthday" type="date" className="text-black" placeholder="태어난 날짜를 입력해주세요" />
                    <label htmlFor="birthday">생년월일을 입력해주세요.</label>
                </div>
                <div>
                    <input type="radio" />
                </div>
            </div>
        </div>
    )
}

export default NamePage;