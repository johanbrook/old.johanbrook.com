require "rake"
require "date"

site_url = "http://johanbrook.com"

# TODO: Write task to compile Sass



desc "Build and deploy site"
task :deploy => [:sitemap, :ping, :push] do 
end


desc 'List all draft posts'
task :drafts do
  puts `find ./_posts -type f -exec grep -H 'published: false' {} \\;`
end


desc 'Push source code to Github'
task :push do
  puts '* Pushing to Github'
  puts `git push origin master`
end

desc 'Create new post'
task :post do
  title, slug, date = get_args
  file = File.join(File.dirname(__FILE__), '_posts', slug + '.markdown')
  create_blank_post(file, title, date)
  puts "* Created #{title}"
  open_in_editor(file)
end



desc "remove files in output directory"
task :clean do
  puts '* Removing Output'
  puts `rm -rf _site/*`
end

desc 'Notify Google of the new sitemap'
task :sitemap do
  begin
    require 'net/http'
    require 'uri'
    puts '* Pinging Google about our sitemap'
    Net::HTTP.get('www.google.com', '/webmasters/tools/ping?sitemap=' + URI.escape("#{site_url}/sitemap.xml"))
  rescue LoadError
    puts '! Could not ping Google about our sitemap, because Net::HTTP or URI could not be found.'
  end
end



def get_args
  unless title = ENV["title"]
    puts "Please provide a post title"
    puts "USAGE: rake post title='the post title' [date='2010-10-10']"
    exit(1)
  end
  date = ENV['date']
  unless date
    date = Time.now.localtime.strftime("%Y-%m-%d")
  end
  
  return [title, "#{date}-#{title.downcase.gsub(/[^\w]+/, '-')}", date]
end



# Helper method for :draft and :post, that will create a file at a given
# location and fill it with an empty post.
def create_blank_post(path, title, date)
  # Create the directories to this path if needed
  FileUtils.mkpath(File.dirname(path))

  # Write the template to the file
  File.open(path, "w") do |f|
    f << <<-EOS.gsub(/^    /, '')
    ---
      title: #{title}
      category: Code
      layout: post
      date: #{date}
    ---

    EOS
  end
end

# Helper method to open a file in the default text editor.
def open_in_editor(file)
  system ("mate #{file}")
end


