import { useRef, useState } from "react";
import './App.css'
function Post(props){
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.children}</p>
    </div>
  )
}
function Modal(props){
  let classlist = "modal";
  if (props.active)
    classlist += " active"
  return (
    <div className={classlist}>
      <div className="modal-content">
        {props.children}
      </div>
    </div>
  )
}

function App() {
  //let posts = [{title: "Тестовый заголовок", text:"Тестовая новость"}];
  const [posts, setPosts] = useState([{title: "Тестовый заголовок", text:"Тестовая новость"}])
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(false);
  const titleRef = useRef();
  const textRef = useRef();
  const filterRef = useRef();
  function addPost(e){
    e.preventDefault();
    const title = titleRef.current.value;
    const text = textRef.current.value;
    if (title === '' || text === '')
      return;
    const oldPosts = posts.slice();
    const post = {title: title, text: text};
    oldPosts.push(post);
    setPosts(oldPosts);
    titleRef.current.value = '';
    textRef.current.value = '';
    setModal(false);
  }
  const filteredPosts = posts.filter(post => 
                                     post.title.toLowerCase().includes(query.toLowerCase()) ||
                                     post.text.toLowerCase().includes(query.toLowerCase())
                                    );
  return (
    <div>
      <div>
        <button onClick={()=>setModal(!modal)}>Добавить пост</button>
        <input id="t1" ref={filterRef} placeholder="Поиск" onChange={()=>setQuery(filterRef.current.value)}/> 
      </div>
      <div>
        {filteredPosts.map(post => <Post title={post.title}>{post.text}</Post>)}
      </div>
      <Modal active={modal}>
        <form>
          <input ref={titleRef} placeholder="Заголовок"/>
          <input ref={textRef} placeholder="Содержание"/>
          <button onClick={addPost}>Добавить</button>
        </form>
      </Modal>
    </div>
  );
}

export default App;
