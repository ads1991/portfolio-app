import { Link } from 'react-router-dom'

export default function Home() {
  const projects = [
    {
      id: 'instagram-clone',
      name: 'Instagram Clone',
      description: 'A full-featured Instagram clone with posts, likes, comments, and user profiles',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
    },
    {
      id: 'project-2',
      name: 'Project 2',
      description: 'Coming soon...',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Portfolio</h1>
        </div>
      </header>

      {/* Resume Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">About Me</h2>
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Full Stack Developer</h3>
            <p className="text-muted-foreground">
              Passionate developer with expertise in React, TypeScript, and modern web technologies.
              Building elegant solutions to complex problems.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Redux', 'Tailwind CSS', 'Node.js', 'Vite'].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
