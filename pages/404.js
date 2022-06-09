import Link from 'next/link'
import Image from 'next/image'


export default function Custom404() {
    return (
        <main>
            <h1>404 - That page does not seem to exist...</h1>
            <Image
                src="https://media.giphy.com/media/1Ahg7KwAI7EXqnvDLT/giphy.gif"
                alt='pengu'
                width="480"
                height="362"
            />
            <Link href="/">
                <button className='btn-blue'>Go Home</button>
            </Link>
        </main>
    );
}