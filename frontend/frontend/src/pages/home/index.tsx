import { format, parse } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoIosArrowRoundBack, IoIosCheckmark } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import Modal from "react-modal";
import logo from "../../assets/logo.webp";
import Slicker from '../../components/Slicker/slicker.tsx';
import useForm from "../../hooks/useForm.tsx";
import { useTask } from "../../hooks/useTasks.tsx";
import { colors } from "../../styles/colors.ts";
import { Container, FormModal } from "./style.ts";

interface Task {
  title: string;
  description: string;
  dateToFinish: string | Date;
}

export const Home = () => {
  const {
    tasks,
    deleteTask,
    updateTask,
    createTask,
    updateCompleted,
    numberTasks,
    numberTasksCompleted,
    fetchTasks,
    page,
    nextPage,
    previousPage
  } = useTask();

  const { handleChange, values, setFormValues, resetForm } = useForm<Task>({
    title: '',
    description: '',
    dateToFinish: '',
  });

  const [search, setSearch] = useState<string>('');

  const [selectedTaskId, setSelectedTaskId] = useState<string>('');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    resetForm();
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!selectedTaskId) {
        createTask(values);
      }
      else {
        updateTask(values, selectedTaskId);
        setSelectedTaskId('');
      }

      closeModal();
      resetForm();
    } catch {
      throw new Error("Erro ao atualizar a tarefa!");
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [updateTask, createTask, closeModal, resetForm, selectedTaskId, values]);

  return (
    <Container>
      <header>
        <img src={logo} alt="Logo da Digigrow" />
      </header>
      <div className='background'>
        <div className='content'>
          <div className='align-content'>
            <section>
              <input placeholder='Buscar por tarefa especifica' type="text" value={search} onChange={({ target }) => setSearch(target.value)} />
              <button type="button" onClick={() => fetchTasks(search)}>Buscar</button>
              <button className="botao-criar-tarefa" type="button" onClick={openModal}>Criar Tarefa</button>
            </section>
            <div className='tarefas-numeros'>
              <span className='tarefa-com-numero'>
                <p className="tarefas-criadas">
                  Tarefas criadas
                </p>
                <div className='numero-redondo'>
                  {numberTasks}
                </div>
              </span>
              <span className='tarefa-com-numero'>
                <p className='tarefas-concluidas'>
                  Concluidas
                </p>
                <div className='numero-redondo'>
                  {numberTasksCompleted}/{numberTasks}
                </div>
              </span>
            </div>
            {
              tasks.map((task) => {
                return (
                  <div className='card' key={task.id}>
                    <button className="button-circle" type="button" onClick={() => updateCompleted(task.id)}>
                      {
                        task.completed && (
                          <div className="button-inner-circle" >
                            <IoIosCheckmark size={24} />
                          </div>
                        )
                      }
                    </button>
                    <div className='card-content'>
                      <div className="titulo-description">
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                      </div>
                      <Slicker />
                      <span className='span-date'>{task.dateToFinish.toString()}</span>
                    </div>
                    <button type="button" onClick={() => {
                      setSelectedTaskId(task.id)
                      setFormValues({
                        ...task,
                        dateToFinish: format(parse(task.dateToFinish, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
                      })
                      openModal()
                    }}>
                      <CiEdit size={24} />
                    </button>
                    <button type="button" onClick={() => deleteTask(task.id)}>
                      <AiFillDelete size={24} />
                    </button>
                  </div>
                );
              })
            }
            {/* <div className='section-paginacao'>
              <button className='paginas' type="button" onClick={previousPage}><IoIosArrowRoundBack size={30} /></button>
              <span className='paginas'>{page}</span>
              <button className='paginas' type="button" onClick={nextPage}><IoIosArrowRoundForward size={30} /></button>
            </div> */}

            <Modal
              className="modal"
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={{
                overlay: {
                  backgroundColor: `${colors.gray40090}`,
                  display: 'flex',
                  alignItems: "center",
                  zIndex: 1
                },
                content: {
                  backgroundColor: `${colors.gray400}`,
                  width: '400px',
                  margin: 'auto',
                  padding: '20px',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                },
              }}
            >
              <FormModal
                onSubmit={handleSubmit}
              >
                <h2>Editar Tarefa</h2>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  maxLength={25}
                  required
                />
                <label htmlFor="description">Description</label>
                <input
                  type="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  maxLength={25}
                  required
                />

                <label htmlFor="dateToFinish">Data de termino</label>
                <input
                  type="date"
                  name="dateToFinish"
                  value={values.dateToFinish}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Salvar alteracoes</button>
                <button type="button" onClick={closeModal} >
                  Cancelar
                </button>
              </FormModal>
            </Modal>

          </div>
        </div>
      </div>
    </Container >
  );
}
