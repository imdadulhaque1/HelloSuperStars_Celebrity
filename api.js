export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjYzI3ZDMzZS0yZWUyLTRhYmUtODExNC1kYzQ1N2Y5OGFlMDEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY2OTc5Mzg5MCwiZXhwIjoxNjcwMzk4NjkwfQ.GheaD9h4xsxEqVjL2q0F8RxbZTcJKRvCq8oWBPQGX5c";

export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v1/meetings`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ region: "sg001" }),
  });

  const { meetingId } = await res.json();
  console.log(meetingId)
  return meetingId;
};