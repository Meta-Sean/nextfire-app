import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';

export default function Navbar({ }) {

    const { user, username } = useContext(UserContext);

    const router = useRouter();

    const signOut = () => {
        auth.signOut();
        router.reload();
    }
  
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button className='btn-logo'>Home</button>
                    </Link>
                </li>

                {username && (
                    <>
                        <li className='push-left'>
                            <button onClick={signOut}>Sign Out</button>
                        </li>
                        <li className='push-left'>
                            <Link href="/admin">
                                <button className='btn-blue'>Write posts</button>
                            </Link>
                        </li>
                        <li>
                        <Link href={`/${username}`}>
                            <img src={user?.photoURL || '/hacker.png'} />
                            {/* <Image src={user?.photoURL} alt='profile picture' /> */}
                        </Link>
                        </li>
                    </>

                )}

                {!username && (
                    <li>
                        <Link href="/enter">
                            <button className='btn-blue'>Log in</button>
                        </Link>
                    </li>                                   
                )}
            </ul>
        </nav>
    )
}