function IndividualProfile({ profile }) {
  console.log(profile);
  return <div>{profile}</div>;
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { profile } = query;
  return {
    props: {
      profile,
    },
  };
}

export default IndividualProfile;
