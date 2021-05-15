import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from './api';

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const [formData, setFormData] = useState({
    title: '',
    comment: '',
    description: '',
    image_uri: '',
    date_visited: '',
    latitude: location.latitude,
    longitude: location.longitude
  })


  useEffect(() => {
      console.log('coordinates', location)
      return () => {
          
      }
  }, [])
  const onSubmit = async () => {
    try {
      setLoading(true);
      console.log('data', formData)
      await createLogEntry(formData);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      { error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
      <label htmlFor="comment">Comment</label>
      <textarea name="comment" rows={3} value={formData.comment} onChange={(e) => setFormData({...formData, comment: e.target.value})} />
      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}/>
      <label htmlFor="image">Image</label>
      <input name="image_uri" value={formData.image_uri} onChange={(e) => setFormData({...formData, image_uri: e.target.value})} />
      <label htmlFor="date_visited">Visit Date</label>
      <input name="date_visited" type="date"  value={formData.date_visited} onChange={(e) => setFormData({...formData, date_visited: e.target.value})} /> 
      <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
    </form>
  );
};

export default LogEntryForm;