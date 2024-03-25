import Navbar from './_components/navbar'
import OrgSidebar from './_components/org-sidebar'
import Sidebar from './_components/sidebar'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='h-full'>
      <Sidebar />

      <div className='pl-[60px] h-full'>
        <div className='gap-x-3 flex h-full'>
          <OrgSidebar />
          <div className='h-full flex-1'>
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default layout
