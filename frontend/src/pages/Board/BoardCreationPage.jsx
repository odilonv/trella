import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreationFormComponent } from '../../components';

function BoardCreationPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Exemple: await createBoard({ name, description });
        console.log('Board created:', { name, description });
        navigate('/boards');
    };

    return (
        <CreationFormComponent theme={"board"} handleSubmit={handleSubmit} name={name} setName={setName} description={description} setDescription={setDescription} />
    );
}

export default BoardCreationPage;