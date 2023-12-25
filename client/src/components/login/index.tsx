import './styles.scss';
import React, {useState} from 'react';

type Props = {
    loginUser: (name: string) => void;
}

export const Login = ({ loginUser }: Props) => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string>('');

    const handleSetUsername = () => {
        if (name.trim().length <= 3) {
            setError('Username must be at least 3 characters long.');
            return;
        }

        loginUser(name);
    };

    return (
        <div className='login'>
            <label htmlFor="name">Username</label>
            <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                required
            />
            {error && <div className="error">{error}</div>}
            <button onClick={handleSetUsername}>Login</button>
        </div>
    );
}