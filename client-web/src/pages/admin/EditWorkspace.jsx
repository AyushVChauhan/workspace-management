import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { fetchGet, fetchPost, fetchUpload } from '../../utils/fetch-utils';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { redirect, useNavigate, useParams } from 'react-router-dom';

const EditWorkspace = () => {
	const [items, setItems] = useState({
		id: '',
		title: '',
		address: '',
		description: '',
		image: null,
		from: '',
		to: '',
	});
	const [rooms, setRooms] = useState([{ label: '', description: '', price: '', image: null }]);
	const [amenities, setAmenities] = useState([{ name: '', description: '', price: '', quantity: '', image: null }]);
	const { workspaceId } = useParams();
	const toast = useRef();
	const navigate = useNavigate();

	const getData = async () => {
		const result = await fetchGet('admin/workspace/edit/' + workspaceId, localStorage.getItem('token'));
		if (result.success) {
			setItems(result.data.workspace);
			setRooms(result.data.rooms);
			setAmenities(result.data.amenities);
		} else {
			navigate('/');
		}
	};

	useEffect(() => {
		getData();
	}, []);
	const handleChange = (index, event, type) => {
		const { name, value, files } = event.target;
		let newItems;

		if (type === 'workspace') {
			newItems = { ...items };
		} else if (type === 'room') {
			newItems = [...rooms];
		} else if (type === 'amenity') {
			newItems = [...amenities];
		}

		if (name === 'image' || name === 'roomimage') {
			newItems[index][name] = files[0];
		} else {
			newItems[index][name] = value;
		}

		if (type === 'workspace') {
			setItems(newItems);
		} else if (type === 'room') {
			setRooms(newItems);
		} else if (type === 'amenity') {
			setAmenities(newItems);
		}
	};

	const addNewRoom = () => {
		setRooms([...rooms, { label: '', description: '', price: '', image: null }]);
	};

	const addNewAmenity = () => {
		setAmenities([...amenities, { name: '', description: '', price: '' }]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();

		// items.forEach((item, index) => {
		// 	formData.append(`items[${index}][title]`, item.title);
		// 	formData.append(`items[${index}][address]`, item.address);
		// 	formData.append(`items[${index}][description]`, item.description);
		// 	if (item.image) {
		// 		formData.append(`items[${index}][image]`, item.image);
		// 	}
		// });
		formData.append('workspaceImage', items.image);
		formData.append('from', items.from);
		formData.append('to', items.to);
		formData.append('description', items.description);
		formData.append('address', items.address);
		formData.append('name', items.title);
		rooms.forEach((room, index) => {
			formData.append(`rooms[${index}][label]`, room.label);
			formData.append(`rooms[${index}][description]`, room.description);
			formData.append(`rooms[${index}][price]`, room.price);
			if (room.image) {
				formData.append(`rooms[${index}][image]`, room.image);
			}
		});

		amenities.forEach((amenity, index) => {
			formData.append(`amenities[${index}][label]`, amenity.name);
			formData.append(`amenities[${index}][description]`, amenity.description);
			formData.append(`amenities[${index}][price]`, amenity.price);
			formData.append(`amenities[${index}][quantity]`, amenity.quantity);
			formData.append(`amenities[${index}][image]`, amenity.image);
		});

		try {
			for (let pair of formData.entries()) {
				console.log(pair[0] + ': ' + pair[1]);
			}
			let token = localStorage.getItem('token');
			const response = await fetchUpload('admin/workspace', token, formData);
			console.log(response);
			if (response.success) {
				toast.current.show({
					severity: 'success',
					summary: 'Confirmed',
					detail: 'Workspace has been added Succesfully',
					life: 3000,
				});
				navigate('/admin/workspace');
			} else {
				toast.current.show({
					severity: 'info',
					summary: 'Error',
					detail: 'There was a Technical error',
					life: 3000,
				});
				navigate('/admin/workspace');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<Toast ref={toast} />
			<div className="px-10">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold">Add Workspace</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor={`title`} className="block text-sm font-bold text-gray-600">
							Workspace Title
						</label>
						<InputText
							id={`title`}
							name="title"
							placeholder="Workspace Title"
							className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
							onChange={(e) => setItems((prev) => ({ ...prev, title: e.target.value }))}
						/>
						<label htmlFor={`address`} className="block text-sm font-bold text-gray-600">
							Address
						</label>
						<InputText
							id={`address`}
							name="address"
							placeholder="Address"
							className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
							onChange={(e) => setItems((prev) => ({ ...prev, address: e.target.value }))}
						/>
						<label htmlFor={`description`} className="block text-sm font-bold text-gray-600">
							Description
						</label>
						<InputText
							id={`description`}
							name="description"
							placeholder="Description"
							className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
							onChange={(e) => setItems((prev) => ({ ...prev, description: e.target.value }))}
						/>
						<label htmlFor={`timing`} className="block text-sm font-bold text-gray-600">
							Timing
						</label>
						<div className="flex flex-row">
							<div className="w-full">
								<InputText
									id={`timing`}
									name="from"
									placeholder="From (hours)"
									className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
									onChange={(e) => setItems((prev) => ({ ...prev, from: e.target.value }))}
								/>
							</div>
							<div className="w-full">
								<InputText
									id={`timing`}
									name="to"
									placeholder="To (hours)"
									className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
									onChange={(e) => setItems((prev) => ({ ...prev, to: e.target.value }))}
								/>
							</div>
						</div>
						<label htmlFor={`image`} className="block text-sm font-bold text-gray-600">
							Workspace Image
						</label>
						<input
							type="file"
							name="image"
							onChange={(e) => setItems((prev) => ({ ...prev, image: e.target.files[0] }))}
						/>
					</div>

					<div className="text-2xl font-bold mt-4">Room Details</div>
					{rooms.map((room, index) => (
						<div key={index}>
							<label htmlFor={`roomlabel-${index}`} className="block text-sm font-bold text-gray-600">
								Label
							</label>
							<InputText
								id={`roomlabel-${index}`}
								name="label"
								placeholder="Label"
								className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
								onChange={(e) => handleChange(index, e, 'room')}
							/>
							<label
								htmlFor={`roomdescription-${index}`}
								className="block text-sm font-bold text-gray-600"
							>
								Description
							</label>
							<InputText
								id={`roomdescription-${index}`}
								name="description"
								placeholder="Description"
								className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
								onChange={(e) => handleChange(index, e, 'room')}
							/>
							<label htmlFor={`roomprice-${index}`} className="block text-sm font-bold text-gray-600">
								Price
							</label>
							<InputText
								id={`roomprice-${index}`}
								name="price"
								placeholder="Price"
								className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
								onChange={(e) => handleChange(index, e, 'room')}
							/>
							<label htmlFor={`roomimage-${index}`} className="block text-sm font-bold text-gray-600">
								Room Image
							</label>
							<input type="file" name="image" onChange={(e) => handleChange(index, e, 'room')} />
						</div>
					))}

					<Button
						type="button"
						onClick={addNewRoom}
						className="transition-all py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300 mt-4"
					>
						Add Another Room
					</Button>

					<div className="text-2xl font-bold mt-4">Amenities</div>
					{amenities.map((amenity, index) => (
						<div key={index}>
							<label htmlFor={`amenitiesname-${index}`} className="block text-sm font-bold text-gray-600">
								Name
							</label>
							<InputText
								id={`amenitiesname-${index}`}
								name="name"
								placeholder="Name"
								className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
								onChange={(e) => handleChange(index, e, 'amenity')}
							/>
							<label
								htmlFor={`amenitiesdescription-${index}`}
								className="block text-sm font-bold text-gray-600"
							>
								Description
							</label>
							<InputText
								id={`amenitiesdescription-${index}`}
								name="description"
								placeholder="Description"
								className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
								onChange={(e) => handleChange(index, e, 'amenity')}
							/>
							<label
								htmlFor={`amenitiesprice-${index}`}
								className="block text-sm font-bold text-gray-600"
							>
								Price
							</label>
							<InputText
								id={`amenitiesprice-${index}`}
								name="price"
								placeholder="Price"
								className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
								onChange={(e) => handleChange(index, e, 'amenity')}
							/>
							<label
								htmlFor={`amenitiesquantity-${index}`}
								className="block text-sm font-bold text-gray-600"
							>
								Quantity
							</label>
							<InputText
								id={`amenitiesquantity-${index}`}
								name="quantity"
								placeholder="quantity"
								className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
								onChange={(e) => handleChange(index, e, 'amenity')}
							/>
							<label htmlFor={`amenityimage-${index}`} className="block text-sm font-bold text-gray-600">
								Amenity Image
							</label>
							<input type="file" name="image" onChange={(e) => handleChange(index, e, 'amenity')} />
						</div>
					))}

					<Button
						type="button"
						onClick={addNewAmenity}
						className="transition-all py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300 mt-4"
					>
						Add Another Amenity
					</Button>

					<Button
						type="submit"
						className="transition-all py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300 mt-4"
					>
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};

export default EditWorkspace;
