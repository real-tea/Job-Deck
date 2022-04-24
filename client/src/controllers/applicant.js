const base = "http://localhost:5000";

export const auth_applicant = async (obj) => {
  const res = await fetch(`${base}/api/applicant/auth`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const register_applicant = async (obj) => {
  const res = await fetch(`${base}/api/applicant/signup`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const login_applicant = async (obj) => {
  const res = await fetch(`${base}/api/applicant/login`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const get_applications = async (obj) => {
  const res = await fetch(`${base}/api/applicant/getapplication`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const get_applicant_details_by_id = async (obj) => {
  const res = await fetch(`${base}/api/applicant/applicantdets`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const apply_application = async (obj) => {
  const res = await fetch(`${base}/api/applicant/application`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const delete_application = async (obj) => {
  const res = await fetch(`${base}/api/applicant/application`, {
    method: "DELETE",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};
