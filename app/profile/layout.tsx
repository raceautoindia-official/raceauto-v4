import ProfileCard from "./ProfileSidebar";

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: 'url("/images/profile-bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="row mx-5">
          <div className="col-lg-3">
            <ProfileCard />
          </div>
          <div className="col-lg-9">{children}</div>
        </div>
      </div>
    </>
  );
}
