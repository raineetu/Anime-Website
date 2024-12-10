import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function NewAnimeAdd() {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    genre: '',
    released: '',
    status: '',
    otherName: '',
    videoUrl: '',
    type: 'TV',
    episode: [{ title: '', videoUrl: '' }]
  });
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle episode changes separately
  const handleEpisodeChange = (index, e) => {
    const { name, value } = e.target;
    const newEpisodes = formData.episode.map((episode, episodeIndex) => {
      if (episodeIndex === index) {
        return { ...episode, [name]: value };
      }
      return episode;
    });
    setFormData({ ...formData, episode: newEpisodes });
  };

  // Add a new episode field
  const addEpisode = () => {
    setFormData({
      ...formData,
      episode: [...formData.episode, { title: '', videoUrl: '' }]
    });
  };

  // Fetch anime details by ID
  const fetchAnimeById = async () => {
    if (!formData.id) {
      toast.error('Please enter an ID to fetch the anime.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8001/detail/${formData.id}`);
      const animeData = response.data;

      // Populate formData with fetched anime details
      setFormData({
        ...animeData,
        episode: animeData.episode || [{ title: '', videoUrl: '' }]
      });
      toast.success('Anime details fetched successfully!');
    } catch (error) {
      console.error('Error fetching anime details:', error);
      toast.error('Failed to fetch anime details. Please check the ID.');
    }
  };

  // Handle adding new anime
  const handleAddAnime = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.id || !formData.title || !formData.imageUrl || !formData.genre || !formData.released || !formData.status || !formData.otherName) {
      setError('Please fill all fields!');
      return;
    }

    // Check if all episodes have titles and video URLs
    const hasEmptyEpisode = formData.episode.some(episode => !episode.title || !episode.videoUrl);
    if (hasEmptyEpisode) {
      setError('Please fill all episode fields!');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      // Use POST method to add new anime details
      const response = await axios.post(`http://localhost:8001/detail`, formData);
      console.log('Anime added successfully:', response.data);

      toast.success('Anime added successfully!');

      // Optionally reset the form after successful submission
      resetForm();
    } catch (error) {
      console.error('Error while adding anime:', error);
      toast.error('Failed to add anime.');
    }
  };

  // Handle updating anime details
  const handleUpdateAnime = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      setError('Please enter an ID to update the anime.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8001/detail/${formData.id}`, formData);
      console.log('Anime updated successfully:', response.data);

      toast.success('Anime updated successfully!');
      resetForm();
    } catch (error) {
      console.error('Error while updating anime:', error);
      toast.error('Failed to update anime.');
    }
  };

  // Handle deleting an anime by ID
  const handleDeleteAnime = async () => {
    if (!formData.id) {
      toast.error('Please provide an ID to delete the anime.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8001/detail/${formData.id}`);
      toast.success('Anime deleted successfully!');
      resetForm();
    } catch (error) {
      console.error('Error deleting anime:', error);
      toast.error('Failed to delete anime.');
    }
  };

  // Function to reset form fields
  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      imageUrl: '',
      genre: '',
      released: '',
      status: '',
      otherName: '',
      videoUrl: '',
      type: 'TV',
      episode: [{ title: '', videoUrl: '' }]
    });
  };

  return (
    <div className="fixed inset-0 mt-[14vh] flex items-center justify-center z-50">
      <form className="bg-gray-800 p-6 rounded-md shadow-md w-full max-w-[800px] mx-auto overflow-y-auto max-h-[90vh]">
        <h1 className="text-2xl font-bold text-pink-600 mb-4 text-center">Anime Management</h1>

          {error && <div className="text-red-500 mb-4">{error}</div>}
              
              <div className="flex gap-x-9">
            {/* First Column */}
            <div>
              <div className="mb-4">
                <label className="block text-white text-lg mb-2">ID</label>
                <input
                  type="number"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className="w-[35vh] p-2"
                  required
                />
              </div>
              <button type="button" onClick={fetchAnimeById} className="bg-blue-500 text-white p-2 rounded-md ">Fetch Anime</button>

              <div className="">
                <label className="block text-white text-lg mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2"
                  required
                />
              </div>
              <div className="">
                <label className="block text-white text-lg mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2"
                  required
                />
              </div>
              <div className="">
                <label className="block text-white text-lg mb-2">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full p-2"
                  required
                />
              </div>
            </div>

            {/* Second Column */}
            <div>
              <div className="">
                <label className="block text-white text-lg mb-2">Genre</label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-[35vh] p-2"
                  required
                />
              </div>
              <div className="">
                <label className="block text-white text-lg mb-2">Release Date</label>
                <input
                  type="date"
                  name="released"
                  value={formData.released}
                  onChange={handleChange}
                  className="w-full p-2"
                  required
                />
              </div>
              <div className="">
                <label className="block text-white text-lg mb-2">Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-lg mb-2">Other Name</label>
                <input
                  type="text"
                  name="otherName"
                  value={formData.otherName}
                  onChange={handleChange}
                  className="w-full p-2"
                />
              </div>
              {/* New Type Field (TV/Movie selection) */}
              <div className="mb-4">
                <label className="block text-white text-lg mb-2">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2"
                >
                  <option value="TV">TV</option>
                  <option value="Movie">Movie</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-">
            <h2 className="text-lg font-bold text-pink-600 ">Episodes</h2>
            {formData.episode.map((ep, index) => (
              <div key={index} className="mb-4 flex gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Episode Title"
                  value={ep.title}
                  onChange={(e) => handleEpisodeChange(index, e)}
                  className="w-[35vh] p-2"
                  required
                />
                <input
                  type="text"
                  name="videoUrl"
                  placeholder="Video URL"
                  value={ep.videoUrl}
                  onChange={(e) => handleEpisodeChange(index, e)}
                  className="w-full p-2"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addEpisode} className="text-blue-500">Add Episode</button>
          </div>

          {/* Buttons for each action */}
          <div className='flex'>
          <button onClick={handleAddAnime} className="bg-green-500 text-white px-4 py-2 rounded mr-[2vh] font-bold mb-2">
            Add Anime
          </button>
          <button onClick={handleUpdateAnime} className="bg-blue-500 text-white px-4 py-2 rounded mr-[2vh]  font-bold mb-2">
            Update Anime
          </button>
          <button onClick={handleDeleteAnime} className="bg-red-500 text-white px-4 py-2 rounded mr-[2vh] font-bold mb-2">
            Delete Anime
          </button>
          </div>
        </form>
      </div>
  );
}

export default NewAnimeAdd; 