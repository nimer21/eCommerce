import React from 'react'
import { useParams,useNavigate } from 'react-router-dom';

export default function Profile() {
  const {id} = useParams();
  const navigate = useNavigate();
  navigate(`/Home`);
  return (
    <div>Profile {id}</div>
  )
}
