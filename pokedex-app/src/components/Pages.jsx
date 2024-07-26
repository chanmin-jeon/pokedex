const Pages = ({getPrevious, getNext}) => {
    return (
        <>
            <button onClick={getPrevious}>Previous</button>
            <button onClick={getNext}>Next</button>
        </>
    )
}

export default Pages