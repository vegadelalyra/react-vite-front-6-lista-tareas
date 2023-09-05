import { useState, useEffect } from 'react'
import './App.css'
import { useRef } from 'react'

function App() {
    const nombreEnMemoria =
        JSON.parse(sessionStorage.getItem('name-react-tasks')) || 'Ana'
    const [nombre, setNombre] = useState(nombreEnMemoria)
    const tareasEnMemoria =
        JSON.parse(localStorage.getItem(nombre + '-react-tasks')) || []
    const [tareas, setTareas] = useState(tareasEnMemoria)
    const [tarea, setTarea] = useState('')

    useEffect(() => {
        localStorage.setItem(nombre + '-react-tasks', JSON.stringify(tareas))
    }, [tareas])

    useEffect(() => {
        const actualizarTareasPorNombre =
            JSON.parse(localStorage.getItem(nombre + '-react-tasks')) || []
        setTareas(actualizarTareasPorNombre)
    }, [nombre])

    const nameRef = useRef(null)

    const handleNameChange = e => {
        e.target.innerText = e.target.innerText.trim()
        sessionStorage.setItem(
            'name-react-tasks',
            JSON.stringify(nameRef.current.innerText.trim())
        )
        setNombre(nameRef.current.innerText.trim())
    }

    const handleAddTask = () => {
        setTareas([...tareas, { id: tareas.length + 1, texto: tarea }])
        setTarea('')
    }

    const handleDeleteTask = id => {
        setTareas(tareas.filter(tarea => tarea.id !== id))
    }

    return (
        <>
            <h1>LISTA DE TAREAS DE </h1>
            <h1
                contentEditable='true'
                ref={nameRef}
                onBlur={handleNameChange}
                onKeyDown={e => {
                    if (e.key != 'Enter') return
                    document.querySelector('input').focus()
                }}>
                {nombre}{' '}
            </h1>
            <h1
                onClick={() => {
                    const a = document.querySelector('[contentEditable="true"]')
                    a.focus()
                }}>
                {' '}
                <i className='fa fa-pencil' />
            </h1>
            <br />
            <br />
            <br />
            <main>
                {' '}
                {tareas.map(item => (
                    <article>
                        {' '}
                        <div className='tareas' key={item.id}>
                            {item.texto}{' '}
                        </div>{' '}
                        <i
                            className='fa fa-trash-o'
                            onClick={() => handleDeleteTask(item.id)}
                        />{' '}
                    </article>
                ))}
            </main>
            <br />
            <input
                type='text'
                name='tarea'
                placeholder='tarea'
                maxLength={17}
                value={tarea}
                onChange={e => setTarea(e.target.value)}
                onKeyDown={e => {
                    if (e.key != 'Enter') return
                    document.querySelector('button').click()
                }}
            />
            <br />
            <br />
            <button type='button' onClick={() => handleAddTask()}>
                Agregar tarea
            </button>
        </>
    )
}

export default App
