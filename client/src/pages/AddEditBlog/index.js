import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import './../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw } from 'draft-js'
import Button from '../../components/Button'

function AddEditBlog() {
  const [blog, setBlog] = React.useState({
    title: '',
    content: EditorState.createEmpty(),
    description: '',
    canShare: false,
    canComment: false,
    canLike: false,
  })

  const onSave = async () => {
    blog.content = blog.content.getCurrentContent()
    blog.content = JSON.stringify(convertToRaw(blog.content))
    console.log(blog)
  }
  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-primary uppercase text-2xl font-bold'>Add Blog</h1>
      </div>
      <div className='flex flex-col gap-5 mt-5'>
        <input
          type='text'
          placeholder='Title'
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        />
        <textarea
          placeholder='Description'
          value={blog.description}
          onChange={(e) => setBlog({ ...blog, description: e.target.value })}
          rows={5}
        />

        <div>
          <Editor
            toolbarStyle={{
              border: '1px solid #ccc',
              zIndex: 1000,
            }}
            editorStyle={{
              border: '1px solid #ccc',
              minHeight: '200px',
              padding: '10px',
            }}
            editorState={blog.content}
            onEditorStateChange={(content) =>
              setBlog({ ...blog, content: content })
            }
          />
        </div>
        <div className='flex gap-5'>
          <div className='flex items-center gap-1'>
            <input
              type='checkbox'
              checked={blog.canShare}
              onChange={(e) => setBlog({ ...blog, canShare: e.target.checked })}
            />

            <h1>Can Share ?</h1>
          </div>

          <div className='flex items-center gap-1'>
            <input
              type='checkbox'
              checked={blog.canComment}
              onChange={(e) =>
                setBlog({ ...blog, canComment: e.target.checked })
              }
            />

            <h1>Can Comment ?</h1>
          </div>

          <div className='flex items-center gap-1'>
            <input
              type='checkbox'
              checked={blog.canLike}
              onChange={(e) => setBlog({ ...blog, canLike: e.target.checked })}
            />

            <h1>Can Like ?</h1>
          </div>
        </div>

        <div className='flex justify-end gap-5'>
          <Button title='Cancel' variant='primary-outlined' />
          <Button title='Save' onClick={onSave} />
        </div>
      </div>
    </div>
  )
}

export default AddEditBlog
