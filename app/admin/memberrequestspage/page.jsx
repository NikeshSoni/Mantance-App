"use client";
import { useEffect, useState } from "react";
import { getMemberRequests } from "../../InstanceStore/memberRequests";

function MemberRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMemberRequests();
        setRequests(result.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {requests.map((r) => (
        <li key={r._id}>{r.email} - {r.status}</li>
      ))}
    </ul>
  );
}

export default MemberRequestsPage;